import { Request } from 'express';
import { SuperAdmin, User } from '@prisma/client';

export type DataStoredInToken = {
  userId: string | null;
  adminId: string | null;
  role: string;
};

export type TokenData = {
  token: string;
  expiresIn: number;
};

export type RequestWithUser = Request & {
  user?: User;
  admin?: SuperAdmin;
};
