import bcrypt from 'bcrypt';
import crypto from 'crypto';
import mongoose, { Schema } from 'mongoose';

export type IUser = mongoose.Document & {
  user: string;
  password: string;
  passwordResetToken: string;
  passwordResetExpires: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: ComparePasswordFunction;
  gravatar: (size: number) => string;
};

type ComparePasswordFunction = (this: IUser, candidatePassword: string, cb?: (err: any, isMatch: any) => {}) => void;

const userSchema = new mongoose.Schema({
  user: { type: String, unique: true, index: true },
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  createdAt: Date,
  updatedAt: Date,
}, { timestamps: true });

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next: any) {
  const user = this as IUser;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, (Err: mongoose.Error, hash) => {
      if (Err) { return next(Err); }
      user.password = hash;
      next();
    });
  });
});

const comparePassword: ComparePasswordFunction = async function (this: IUser, candidatePassword) {
  const result = await bcrypt.compare(candidatePassword, this.password);
  return result;
};

userSchema.methods.comparePassword = comparePassword;

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function (iuser: IUser, size: number = 200) {
  if (!iuser.user) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash('md5').update(iuser.user).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

const UserCollection = mongoose.model<IUser>('User', userSchema);

export default UserCollection;
