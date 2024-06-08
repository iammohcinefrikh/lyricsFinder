import mongoose, { Document } from "mongoose";
import { ObjectId } from "mongodb";

interface IArtist extends Document {
    artistFirstName: string;
    artistLastName: string;
    artistPicture: string;
  }

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

  const Artist = mongoose.model<IArtist>("Artist", artistSchema);
