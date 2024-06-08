import mongoose, { Document } from "mongoose";
import { ObjectId } from "mongodb";

interface IPasswordReset extends Document {
    userId: ObjectId;
    code: string;
    createdAt: Date;
  }
  

const passwordResetSchema = new mongoose.Schema<IPasswordReset>({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    code: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 300
    }
  });

  const PasswordReset = mongoose.model<IPasswordReset>("PasswordReset", passwordResetSchema);

  