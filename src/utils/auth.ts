import jwt from 'jsonwebtoken';
import { User } from '../types/user.type';

const jwtConfig = {
  accessTokenSecret: process.env.JWT_ACCESSTOKEN_SECRET || '',
  refreshTokenSecret: process.env.JWT_REFRESHTOKEN_SECRET || '',
  issuer: process.env.JWT_ISSUER || '',
  audience: process.env.JWT_AUDIENCE || '',
};

const authUtils = {
  async generateAccessToken(user: User) {
    return jwt.sign({ user: user.user || ''}, jwtConfig.accessTokenSecret, {
      subject: user.id || '',
      audience: jwtConfig.audience,
      issuer: jwtConfig.issuer,
      expiresIn: '30min',
    });
  },
  async generateRefreshToken(user: User) {
    return jwt.sign({ user: user.user || ''}, jwtConfig.refreshTokenSecret , {
      subject: user.id || '',
      audience: jwtConfig.audience,
      issuer: jwtConfig.issuer,
      expiresIn: '2d',
    });
  },
};

export default authUtils;
