// import necessary modules
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

// define the user interface
interface IUser extends Document {
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userPassword: string;
  isAdmin: boolean;
  isSubscribed: boolean;
}

// define the song interface
// interface ISong extends Document {
//   songTitle: string;
//   songGenre: string;
//   songArtist: string;
//   songRecordedDate: Date;
//   songLyrics: string;
// }

// define the artist interface
interface IArtist extends Document {
  artistFirstName: string;
  artistLastName: string;
  artistPicture: string;
  genre: string;
  born_date: Date;
  born_city: string;
  died_date: Date
}

// define the password reset interface
interface IPasswordReset extends Document {
  userId: ObjectId;
  code: number;
  createdAt: Date;
}

// define the user schema
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

// define the song schema
// const songSchema = new mongoose.Schema<ISong>({
//   songTitle: {
//     type: String,
//     required: true
//   },
//   songGenre: String,
//   songArtist: {
//     type: String,
//     required: true
//   },
//   songRecordedDate: Date,
//   songLyrics: {
//     type: String,
//     required: true
//   }
// });

// define the artist schema
const artistSchema = new mongoose.Schema<IArtist>({
  artistFirstName: {
    type: String,
    required: true
  },
  artistLastName: {
    type: String,
    required: true
  },
  artistPicture: String,
  genre:{
    type: String,
    required: true
  },
  born_date: {
    type: Date,
    required: true
  },
  born_city:{
    type: String,
    required: true
  },
  died_date: {
    type: Date,
    required: true
  }
});

// define the password reset schema
const passwordResetSchema = new mongoose.Schema<IPasswordReset>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  code: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300
  }
});

// create the user model
const User = mongoose.model<IUser>("User", userSchema);
// create the song model
// const Song = mongoose.model<ISong>("Song", songSchema);
// create the artist model
const Artist = mongoose.model<IArtist>("Artist", artistSchema);
// create the password reset model
const PasswordReset = mongoose.model<IPasswordReset>("PasswordReset", passwordResetSchema);

// export the models
export { User, Artist, PasswordReset };