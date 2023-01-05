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
  const profilePayload = req.body

  console.log(monthId, "----sise -> ", profilePayload);
  payloadFactory(profilePayload)
  let profilePost;
  try {
    // profilePost = await Profile.updateMany(
    //     {month:monthId, 'profiles.ref': '01' },
    //     { 'profiles.$.sizes': [ sizeArr ] },
    //     { new: true },
    // );
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
  * Utility functions
  ******************************************************************
*/
function payloadFactory(data: any){
  // get all data
  for(const payload of data){
    // pass it to the switch method
    const type =distributionCenter(payload)
    console.log('-----------------------------')
    console.log('type -> ', type)
    console.log('-----------------------------')
  }

  function distributionCenter(singleOb:any){
    const str = singleOb.name
    const left = formatName(str)
    const right = formatShippedName(str)
    const size = formatSizeName(str)
    console.log('------------ str ------------')
    console.log(str)
    console.log('------------ type ------------')
    console.log(left, right)
    console.log('------------ size ------------')
    console.log(size)
    return left + ' - ' + right
    // AB_MX - Semi Annual (5 per box)
  }

  function formatName(str:string){
    const formatName = str.split('in')
    const left = handleLeftRight(formatName[0].toLowerCase())
    const right = handleLeftRight(formatName[1].toLowerCase())
    console.log('left and right')
    console.log(left, right)
    console.log(formatName)
    
    return left + '_' + right
  }

  function formatShippedName(str: string){
    const formatName = str.split('(')
    const a = formatName[1].toLowerCase()
    if(a.includes('quarterly')){
      return 'Quarterly (3 per box)'
    } 
    return 'Semi Annual (5 per box)'
  }

  function formatSizeName(str: string){
    const formatName = str.split('in')[2].trim().toLowerCase()
    return formatName
  }

  function handleLeftRight(str: string){
    const name = str.trim().split(' ')
    if(name.includes('mixed')){
      return 'MX'
    } else if(name.includes('neutrals')){
      return 'NU'
    }
    const a = name[0].charAt(0).toUpperCase()
    const b = name[1].charAt(0).toUpperCase()
    return a+b
  }
}