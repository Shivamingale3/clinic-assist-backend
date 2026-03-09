import { hash } from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@prisma/client';
import { prisma } from '@databases';
import { isEmpty } from '@utils/util';

class UserService {
  public users = prisma.user;

  public async findAllUser(): Promise<User[]> {
    const users: User[] = await this.users.findMany();
    return users;
  }

  public async findUserById(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

    const findUser: User = await this.users.findUnique({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findUnique({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({ data: { ...userData, password: hashedPassword } });

    return createUserData;
  }

  public async updateUser(userId: string, userData: UpdateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    if (userData.email) {
      const findUser: User = await this.users.findUnique({ where: { email: userData.email } });
      if (findUser && findUser.id !== userId) throw new HttpException(409, `This email ${userData.email} already exists`);
    }

    if (userData.password) {
      const hashedPassword = await hash(userData.password, 10);
      userData = { ...userData, password: hashedPassword };
    }

    try {
      const updateUserById: User = await this.users.update({
        where: { id: userId },
        data: userData,
      });
      return updateUserById;
    } catch (e) {
      throw new HttpException(409, "User doesn't exist");
    }
  }

  public async deleteUser(userId: string): Promise<User> {
    try {
      const deleteUserById: User = await this.users.delete({ where: { id: userId } });
      return deleteUserById;
    } catch {
      throw new HttpException(409, "User doesn't exist");
    }
  }
}

export default UserService;
