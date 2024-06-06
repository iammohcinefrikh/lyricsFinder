import mongoose, { Document } from "mongoose";
import { ObjectId } from "mongodb";

interface IUser extends Document {
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userPassword: string;
  isAdmin: boolean;
}

interface ISong extends Document {
  songTitle: string;
  songGenre: string;
  songArtist: string;
  songRecordedDate: Date;
  songLyrics: string;
}

interface IArtist extends Document {
  artistFirstName: string;
  artistLastName: string;
  artistPicture: string;
}

interface IPasswordReset extends Document {
  userId: ObjectId;
  code: string;
  createdAt: Date;
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
  }
});

const songSchema = new mongoose.Schema<ISong>({
  songTitle: {
    type: String,
    required: true
  },
  songGenre: String,
  songArtist: {
    type: String,
    required: true
  },
  songRecordedDate: Date,
  songLyrics: {
    type: String,
    required: true
  }
});

const artistSchema = new mongoose.Schema<IArtist>({
  artistFirstName: {
    type: String,
    required: true
  },
  artistLastName: {
    type: String,
    required: true
  },
  artistPicture: String
});

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

const User = mongoose.model<IUser>("User", userSchema);
const Song = mongoose.model<ISong>("Song", songSchema);
const Artist = mongoose.model<IArtist>("Artist", artistSchema);
const PasswordReset = mongoose.model<IPasswordReset>("PasswordReset", passwordResetSchema);

export { User, Song, Artist, PasswordReset };