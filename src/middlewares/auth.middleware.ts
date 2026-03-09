import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import { prisma } from '@databases';

const getAuthorization = (req: RequestWithUser) => {
  const cookie = req.cookies['Authorization'];
  if (cookie) return cookie;

  const header = req.header('Authorization');
  if (header) return header.split('Bearer ')[1];

  return null;
};

const authMiddleware = async (req: RequestWithUser, _res: Response, next: NextFunction) => {
  try {
    const Authorization = getAuthorization(req);

    if (Authorization) {
      const secretKey: string = SECRET_KEY;
      const verificationResponse = (await verify(Authorization, secretKey)) as DataStoredInToken;
      const { adminId, userId } = verificationResponse;

      if (userId) {
        const findUser = await prisma.user.findUnique({ where: { userId: userId } });
        if (findUser) {
          req.user = findUser;
          return next();
        }
      }

      if (adminId) {
        const findAdmin = await prisma.superAdmin.findUnique({ where: { superAdminId: adminId } });
        if (findAdmin) {
          req.admin = findAdmin;
          return next();
        }
      }
      return next(new HttpException(401, 'Wrong authentication token'));
    }

    return next(new HttpException(404, 'Authentication token missing'));
  } catch (error) {
    return next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;
