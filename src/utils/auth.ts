import jwt from 'jsonwebtoken';
import { User } from '../types/user.type';

const jwtConfig = {
  accessTokenSecret: process.env.JWT_ACCESSTOKEN_SECRET || '2155B3A7378B76C15A33932859D6F',
  refreshTokenSecret: process.env.JWT_REFRESHTOKEN_SECRET || '11EC248BF9C2CF4AEAC958724EB4B',
  issuer: process.env.JWT_ISSUER || '6AC3E9A78E316',
  audience: process.env.JWT_AUDIENCE || 'B55EF41518AED',
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
