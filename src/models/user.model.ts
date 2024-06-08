import mongoose, { Document } from "mongoose";
import { ObjectId } from "mongodb";

interface IUser extends Document {
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userPassword: string;
  isAdmin: boolean;
  isSubscribed: boolean;
}
const userSchema = new mongoose.Schema<IUser>({
    userFirstName: {
      type: String,
      required: true
    },
    userLastName: {
      type: String,
      required: true
    },
    userEmail: {
      type: String,
      unique: true,
      required: true
    },
    userPassword: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: true
    },
    isSubscribed: {
      type: Boolean,
      required: true
    }
});
export const User = mongoose.model<IUser>("User", userSchema);
