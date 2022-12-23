import mongoose from "mongoose";
import {profileSchemaType} from '../utilities/profileTypes';

const { Schema, model } = mongoose;

const profileSchema = new Schema<profileSchemaType>({
  month: String,
  profiles: [
    {
      name: String,
      ref: String,
      sizes: [
        {
          xs: [String],
          sm: [String],
          md: [String],
          lg: [String],
          xl: [String],
          "1x": Schema.Types.Mixed,
          "2x": [String],
          "3x": [String],
          "4x": [String],
        },
      ],
    },
  ],
});

export const Profile = model<profileSchemaType>("Profile", profileSchema);
