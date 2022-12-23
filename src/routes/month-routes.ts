import express from "express";
import {
  getMonths,
  createMonth,
  getMonth,
} from "../controllers/month-controller";
import {
  createProfileSize,
  deleteProfileSize,
  patchProfileSize,
} from "../controllers/size-controller";

const router = express.Router();
/*
  ******************************************************************
  * Data coming from when the user is changing section D
  * GET, POST, UPDATE, DELETE
  * /api/size/...
  *
  ******************************************************************
 */
router.post("/api/monthViews/:mvid/profiles/:pid/size/:sid", createProfileSize);
router.delete(
  "/api/monthViews/:mvid/profiles/:pid/size/:sid",
  deleteProfileSize
);
router.patch("/api/monthViews/:mvid/profiles/:pid/size/:sid", patchProfileSize);
/*
  ******************************************************************
  * Data coming from when the user is changing the Date
  * GET, POST, UPDATE, DELETE
  * /api/monthViews/...
  ******************************************************************
 */
router.get("/", getMonths);
router.post("/api/monthViews/:mvid", createMonth);
router.get("/api/monthViews/:mvid", getMonth);

export default router;
