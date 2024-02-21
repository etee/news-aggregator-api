import { Request, Response } from "express";
import { registerUser, loginUser } from "./services"; 
import { HTTP_CODES } from "../constants";

const register = async (req: Request, res: Response) => {
    const createdUser = await registerUser(req.body);
    return res.status(createdUser?.status).send(createdUser?.message);
}

const login = async (req: Request, res: Response) => {
    const loggedInUser = await loginUser(req.body);
    if(loggedInUser?.status === HTTP_CODES.OK) {
        return res.status(loggedInUser?.status).send({token: loggedInUser?.accessToken, user: loggedInUser?.user});
    } 
    return res.status(loggedInUser?.status).send(loggedInUser?.message);
}

export { register, login }