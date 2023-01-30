import mongoose from "mongoose";

import { Profile } from "../models/profiles";
import HttpError from "../models/http-error";
import { profile } from "console";

import profileArray from "../data/profiles.json";

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
 * POST request for api/monthView/:mvid
 ******************************************************************
 */
export const createMonth = async (req: any, res: any, next: any) => {
  const isMonth = await checkMonth(req.params.mvid);
  console.log(isMonth);

  const createProfile = new Profile({
    month: req.params.mvid,
    profiles: profileArray,
  });

  const result = await createProfile.save();
  res.json(result);
};
/*
  ******************************************************************
    GET request for Months /...
  ******************************************************************
*/
export const getMonth = async (req: any, res: any, next: any) => {
  const monthId = req.params.mvid;

  let monthView;
  try {
    monthView = await Profile.find({ month: monthId });
  } catch (error) {
    const err = new HttpError("Something went wrong GET :mvid", 500);
    return next(error);
  }

  if (!profile) {
    throw new HttpError("Could not find month for provided :mvid", 404);
  }
  res.json(monthView);
};
/*
  ******************************************************************
    GET request for Months /...
  ******************************************************************
*/
export const getMonths = async (req: any, res: any, next: any) => {
  checkAllMonths();
  Profile.find({}, function (error: any, documents: any) {
    if (error) {
      const err = new HttpError("Something went wrong GET :mvid", 500);
    } else {
      res.json(documents);
    }
  });
};
/*
  ******************************************************************
    Utility functions 
  ******************************************************************
*/
async function checkMonth(name: string) {
  const docs = await Profile.find({ month: name });
  const isThere = docs.length > 0;
  console.log(docs.length)
  return isThere;
}
async function checkAllMonths() {
  const checkDate = formatDay();
  const arrDates = Object.values(datesCreate(checkDate));

  for(const el of arrDates){

    const {year, month} = el
    const dateValue = year + '-' + month

    if(!checkMonth(dateValue)){
        const createProfile = new Profile({
          month: dateValue, 
          profiles: profileArray,
        });
      
        await createProfile.save();
    }
  }
}

type DateType = {
  year: string;
  month: string;
};

function datesCreate(arr: number[]) {
  const [year, month] = arr;
  const datesObj: DateType[] = [];
  // create from year to end of month
  const dY = year + 2;
  let dM = month
  let i = 0;
  for (let y = year; y <= dY; y++) {
    for (let m = dM; m <= 12; m++) {
      datesObj.push({ year: String(y), month: String(m).padStart(2, "0") });
      i++;
    }
    if (dM == 12) dM = 1;
  }
  return datesObj
}
function formatDay() {
  const today = new Date();
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  return [yyyy, +mm];
}
