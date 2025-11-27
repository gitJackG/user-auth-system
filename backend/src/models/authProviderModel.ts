import mongoose from "mongoose";

export interface AuthProviderDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  provider: string;
  providerId: string;
  accessToken?: string;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

const authProviderSchema = new mongoose.Schema<AuthProviderDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    provider: {
      type: String,
      required: true,
    },
    providerId: {
      type: String,
      required: true,
    },
    accessToken: { type: String },
    refreshToken: { type: String },
  },
  { timestamps: true }
);


authProviderSchema.index(
  { provider: 1, providerId: 1 },
  { unique: true }
);

const AuthProviderModel = mongoose.model<AuthProviderDocument>(
  "AuthProvider",
  authProviderSchema
);

export default AuthProviderModel;
