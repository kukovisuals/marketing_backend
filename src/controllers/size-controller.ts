import mongoose from "mongoose";

import { Profile } from "../models/profiles";
import HttpError from "../models/http-error";
import { profile } from "console";

require("dotenv").config();

const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASSWORD;
const db_path = process.env.DB_PATH;

const uri = `mongodb+srv://${db_user}:${db_pass}@${db_path}.net/products?retryWrites=true&w=majority`;

mongoose
  .connect(uri)
  .then(() => {
    console.log("connected to database");
  })
  .catch(() => {
    console.log("Connection failed");
  });

/*
******************************************************************
POST request for /api/profiles/:pdi/size/:sid
******************************************************************
*/

export const createProfileSize = async (req: any, res: any, next: any) => {

  const monthId = req.params.mvid;
  const profileId = req.params.pid;
  const sizeId = req.params.sid;
  const sizeArr = req.body

  console.log(sizeId, "----sise -> ", sizeArr);
  let profilePost;
  try {
    profilePost = await Profile.findOneAndUpdate(
        {month:monthId, 'profiles.ref': profileId },
        { 'profiles.$.sizes': [ sizeArr ] },
        { new: true },
    );
    // profilePost = await Profile.updateOne(filter, { $set: update });
  } catch (error) {
    const err = new HttpError("Something went wrong GET :mvid", 500);
    return next(error);
  }

  if (!profile) {
    throw new HttpError("Could not find month for provided :mvid", 404);
  }
  res.json(profilePost);
};

/*
******************************************************************
DELETE request for /api/profiles/:pdi/size/:sid
******************************************************************
*/
export const deleteProfileSize = async (req: any, res: any, next: any) => {

    const monthId = req.params.mvid;
    const profileId = req.params.pid;
    const sizeId = req.params.sid;
    const sizeArr = req.body
  
    console.log(sizeId, "----delete -> ", sizeArr);
    let profilePost;
    try {
      profilePost = await Profile.findOneAndUpdate(
          {month:monthId, 'profiles.ref': profileId },
          { 'profiles.$.sizes': [ sizeArr ] },
          { new: true },
      );
      // profilePost = await Profile.updateOne(filter, { $set: update });
    } catch (error) {
      const err = new HttpError("Something went wrong GET :mvid", 500);
      return next(error);
    }
  
    if (!profile) {
      throw new HttpError("Could not find month for provided :mvid", 404);
    }
    res.json(profilePost);
  };
  /*
******************************************************************
PATCH request for /api/profiles/:pdi/size/:sid
******************************************************************
*/
export const patchProfileSize = async (req: any, res: any, next: any) => {

    const monthId = req.params.mvid;
    const profileId = req.params.pid;
    const sizeId = req.params.sid;
    const sizeArr = req.body
  
    console.log(sizeId, "----delete -> ", sizeArr);
    let profilePost;
    try {
      profilePost = await Profile.findOneAndUpdate(
          {month:monthId, 'profiles.ref': profileId },
          { 'profiles.$.sizes': [ sizeArr ] },
          { new: true },
      );
      // profilePost = await Profile.updateOne(filter, { $set: update });
    } catch (error) {
      const err = new HttpError("Something went wrong GET :mvid", 500);
      return next(error);
    }
  
    if (!profile) {
      throw new HttpError("Could not find month for provided :mvid", 404);
    }
    res.json(profilePost);
  };

export const createAllprofiles = async (req: any, res: any, next: any) => {

  const monthId = req.params.mvid;
  const sizeArr = req.body

  console.log(monthId, "----sise -> ", sizeArr);
  let profilePost;
  try {
    profilePost = await Profile.updateMany(
        {month:monthId, 'profiles.ref': '01' },
        { 'profiles.$.sizes': [ sizeArr ] },
        { new: true },
    );
    // profilePost = await Profile.updateOne(filter, { $set: update });
  } catch (error) {
    const err = new HttpError("Something went wrong GET :mvid", 500);
    return next(error);
  }

  if (!profile) {
    throw new HttpError("Could not find month for provided :mvid", 404);
  }
  res.json(profilePost);
};