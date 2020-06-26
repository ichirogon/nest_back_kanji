import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';

export const UserSchema = new mongoose.Schema(
  {
    email: { type: String },
    // role: { type: String, default: 'trainer' },
    password: { type: String },
    salt: { type: String },
  },
  {
    timestamps: true,
  },
);

UserSchema.methods.validatePassword = async (userPassword, password, salt) => {
  const hash = await bcrypt.hash(password, salt);
  return hash === userPassword;
};

export interface User extends mongoose.Document {
  _id: string;
  email: string;
  password: string;
  salt: string;
  //   role: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  validatePassword: (userPassword, password, salt) => {};
}
