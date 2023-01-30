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
      { month: monthId, 'profiles.ref': profileId },
      { 'profiles.$.sizes': [sizeArr] },
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
      { month: monthId, 'profiles.ref': profileId },
      { 'profiles.$.sizes': [sizeArr] },
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
      { month: monthId, 'profiles.ref': profileId },
      { 'profiles.$.sizes': [sizeArr] },
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

interface SizeInput {
  [index: string]: string[]
}
export const createAllprofiles = async (req: any, res: any, next: any) => {

  const monthId = req.params.mvid;
  const profilePayload = req.body

  // console.log(profilePayload)
  const dataLength = profilePayload.length

  let profileSizeObject: SizeInput = {}

  for (let i = 0; i < profilePayload.length; i++) {
    const typeAndSize = payloadFactory(profilePayload[i]);
    const profileSize = typeAndSize[1];
    const profileName = typeAndSize[0];

    console.log(' type -> ', typeAndSize)
    console.log(monthId, " name -----> ", profilePayload[i]);
    const sizeArray = profilePayload[i].pdps2
    for (let j = 0; j < sizeArray.length; j++) {

      if (!profileSizeObject[profileName + '::' + profileSize])
        profileSizeObject[profileName + '::' + profileSize] = []

      profileSizeObject[profileName + '::' + profileSize].push(sizeArray[j].name)
    }
    
  }
  console.log('profileSizeObject', profileSizeObject)

  let profilePost;
  try {
    const dataEntry = Object.entries(profileSizeObject)
    for (let i = 0; i < dataEntry.length; i++) {
      const keyName = dataEntry[i][0].split('::')[0]
      const size = dataEntry[i][0].split('::')[1]

      const sizeArray = dataEntry[i][1]
      console.log(sizeArray, 'sizeArray')
      console.log(size,'size')
      console.log(keyName,'keyName')
      const filter = { month: monthId, 'profiles.name': keyName, }
      const update = { $set: { ["profiles.$.sizes.0." + size]: sizeArray } }
      Profile.updateOne(filter, update, (error: any, result: any) => {
        if (error) {
          console.log(error);
        } else {
          console.log(result);
        }
      });
      // profilePost = await Profile.updateMany(
      //     {month:monthId, 'profiles.name': keyName, },
      //     { 'profiles.$.sizes': [ sizeArray ] },
      //     { new: true },
      // );
    }
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
  * Utility functions
  ******************************************************************
*/
function payloadFactory(payload: any) {

  // pass it to the switch method
  const type = distributionCenter(payload)
  return type

  function distributionCenter(singleOb: any) {
    const str = singleOb.name
    const left = formatName(str)
    if (str.includes('_')) {
      return left
    }
    const right = formatShippedName(str)
    const size = formatSizeName(str)
    return [left + ' - ' + right, size]
    // AB_MX - Semi Annual (5 per box)
  }

  function formatName(str: string) {
    const formatName = str.split('in')
    const valueLeft = formatName[0]
    const valueRight = formatName[1]
    let left = valueLeft.trim(), right = valueRight.trim();


    if (valueLeft.includes('_')) {
      console.log('bakcend size-controller: -> ', [left + ',' + right])
      return [left, right]
    }
    console.log('bakcend size-controller -___- ', formatName)
    left = handleLeftRight(valueLeft.toLowerCase())
    right = handleLeftRight(valueRight.toLowerCase())
    return left + '_' + right

  }

  function formatShippedName(str: string) {
    const formatName = str.split('(')
    const a = formatName[1].toLowerCase()
    if (a.includes('quarterly')) {
      return 'Quarterly (3 per box)'
    }
    return 'Semi Annual (5 per box)'
  }

  function formatSizeName(str: string) {
    const formatName = str.split('in')[2].trim().toLowerCase()
    return formatName
  }

  function handleLeftRight(str: string) {
    const name = str.trim().split(' ')

    if (name.includes('mixed')) {
      return 'MX'
    } else if (name.includes('neutrals')) {
      return 'NU'
    }
    const a = name[0].charAt(0).toUpperCase()
    const b = name[1].charAt(0).toUpperCase()
    return a + b
  }
}