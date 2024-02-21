import express  from "express";
import { register, login } from "../../auth/controller";
import { registrationValidator } from "../../middlewares/validator";
const authRoutes = express.Router();

authRoutes.use(express.json());
authRoutes.use(express.urlencoded({extended: false}));

authRoutes.post("/register", registrationValidator, register);
authRoutes.post("/login", login);

export default authRoutes;