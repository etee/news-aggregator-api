import express from "express";
import { preferencesValidator } from "../../middlewares/validator";
import {
  getPreferences,
  updatePreferences,
} from "../../preferences/controllers";
import verifyToken from "../../middlewares/auth";
const preferencesRoutes = express.Router();

preferencesRoutes.get("/", verifyToken, getPreferences);
preferencesRoutes.put(
  "/",
  [preferencesValidator, verifyToken],
  updatePreferences
);

export default preferencesRoutes;
