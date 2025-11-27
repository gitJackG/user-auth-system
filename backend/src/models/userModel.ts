import mongoose from "mongoose";
import { hashValue, compareValue } from "../utils/bcrypt";

export interface UserDocument extends mongoose.Document {
  email: string;
  password?: string | null;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(val: string): Promise<boolean>;
  omitPassword(): Partial<UserDocument>;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, default: null },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);


userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  this.password = await hashValue(this.password);
  next();
});

userSchema.methods.comparePassword = async function (val: string) {
  if (!this.password) return false;
  return compareValue(val, this.password);
};


userSchema.methods.omitPassword = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};


userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;
