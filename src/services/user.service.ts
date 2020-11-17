import { AuthTokenCollection, IAuthToken } from '../model/auth.model';
import UserCollection, { IUser } from '../model/user.model';
import { User } from '../types/user.type';
import authUtils from '../utils/auth';
class UserService {
  async list() {
    const users = await UserCollection.find();
    return users;
  }

  async find(input: any) {
    return authUtils.verifyJWT(input).then(async (verifyUser: any) => {
      const user = await UserCollection.findOne({
        user: verifyUser.user,
      });
      if (!user) {
        const err: Error = new Error();
        err.message = 'User not found';
        err.name = 'Error';
        throw err;
      }
      return user;
    }).catch((err) => {
      throw err;
    });
  }

  async checkPassword(input: any) {
    const data = await UserCollection.findOne({
      user: input.user,
    });
    if (data && input.password) {
      const isMatch: any = await data.comparePassword(input.password);
      if (!isMatch) {
        const err: Error = new Error();
        err.message = 'NOT_MATCH';
        err.name = 'Error';
        throw err;
      }
    }
    return data;
  }

  async refreshToken(input: string) {
    const verifyUser: any = await authUtils.verifyRefreshToken(input);
    const user = await UserCollection.findOne({
      user: verifyUser.user,
    });
    const info: User = {
      user: verifyUser.user,
    }
    const accessToken = await authUtils.generateAccessToken(info);
    const refreshToken = await authUtils.generateRefreshToken(info);

    return {
      accessToken,
      refreshToken,
      ...user,
    }
  }

  async detail(input: User) {
    const findUser = await UserCollection.findOne({
      user: input.user,
    });
    if (!findUser) {
      const err: Error = new Error();
      err.message = 'NOT_FOUND';
      err.name = 'Error';
      throw err;
    }

    let token: any;
    if (input.password) {
      const isMatch: any = await findUser.comparePassword(input.password);
      if (!isMatch) {
        const err: Error = new Error();
        err.message = 'NOT_MATCH';
        err.name = 'Error';
        throw err;
      }
    }
    // Create Token
    const newAccessToken = await authUtils.generateAccessToken(input);
    const newRefreshToken = await authUtils.generateRefreshToken(input);
    // let kind = find.getService();
    const authToken = {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      kind: '',
    };
    return AuthTokenCollection.findOne(
      { user: findUser.id }
    ).then( async (existingUser: IAuthToken | null) => {
        if (existingUser) {
          token = await AuthTokenCollection.findOneAndUpdate(
            { user: findUser.id },
            authToken
          );
        } else {
          token = await AuthTokenCollection.create({
            user: findUser.id,
            ...authToken,
          });
        }
        return {
          user: findUser.user,
          name: findUser.name,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        };
      }
    );
  }

  async create(input: User) {
    await UserCollection.findOne({
      user: input.user,
    }).then((user) => {
      if (user) {
        const err: Error = new Error();
        err.message = 'USER_EXIST';
        err.name = 'Error';
        throw err;
      }
    });
    const userCreate = new UserCollection({
      user: input.user,
      password: input.password,
      name: input.name,
    });
    await userCreate.save();
    return userCreate;
  }

  async update(input: User) {
    const user = await UserCollection.findOne({
      user: input.user,
    });
    if (!user) {
      const error = new Error();
      error.message = ' User not found';
      throw error;
    }
    if (input.password) {
      user.password = input.password;
    }
    if (input.name) {
      user.name = input.name;
    }
    await user.save();

    return user;
  }
}

export default new UserService();
