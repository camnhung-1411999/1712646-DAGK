import { AuthTokenCollection, IAuthToken } from '../model/auth.model';
import UserCollection, { IUser } from '../model/user.model';
import { User } from '../types/user.type';
import authUtils from '../utils/auth';
class UserService {
    async list(){
        const users = await UserCollection.find();
        return users;
    }

    async find(input: string) {
        const user = await UserCollection.findOne({
            user: input,
        });
        if (!user) {
            const err: Error = new Error();
            err.message = 'User not found';
            err.name = 'Error';
            throw err;
        }
        return user;
    }

    async detail(input: User) {
        const findUser = await UserCollection.findOne({
            user: input.user
        });
        if (!findUser) {
            const err: Error = new Error();
            err.message = 'NOT_FOUND';
            err.name = 'Error';
            throw err;
        }

        let token:any;
    if (input.password) {
      const isMatch: any = await findUser.comparePassword(input.password);
      if (!isMatch) {
        const err: Error = new Error();
        err.message = 'NOT_MATCH';
        err.name = 'Error';
        throw err;
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
      await AuthTokenCollection.findOne(
        { user: findUser.id },
        async (error: Error, existingUser: IAuthToken) => {
          if (existingUser) {
            token = await AuthTokenCollection.findOneAndUpdate(
              { user: findUser.id },
              authToken
            );
          } else {
            token = new AuthTokenCollection({
              user: findUser.id,
              ...authToken,
            }).save();
          }
        }
      );
    }
    return { 
        ...findUser,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
    };
  }

  async create(input: User){
    await UserCollection.findOne({
        user: input.user
    })
    .then((user) => {
      if (user) {
        const err: Error = new Error();
        err.message = 'USER_EXIST'
        err.name = 'Error'
        throw err;
      }
    })
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
        error.message =" User not found";
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

export default new UserService;