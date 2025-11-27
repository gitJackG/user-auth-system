import { NOT_FOUND, OK } from "../constants/http";
import UserModel from "../models/userModel";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";
import AuthProviderModel from "../models/authProviderModel";

export const getUserHandler = catchErrors(async (req, res) => {
  const user = await UserModel.findById(req.userId);
  appAssert(user, NOT_FOUND, "User not found");

  const providers = await AuthProviderModel.find({ userId: user._id });
  const providerNames = providers.map((p) => p.provider);

  return res.status(OK).json({
    ...user.omitPassword(),
    providers: providerNames,
  });
});

export const getAllUsers = catchErrors(async (req, res) => {
  const count = await UserModel.countDocuments();
  return res.status(OK).json({ count });
});