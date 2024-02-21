import { NextFunction, Request, Response } from "express";
import userSchema from "../models/user.model";
import { ValidationResult } from "joi";
import { ERR_MALFORMED_REQUEST } from "../constants";

const registrationValidator = (req: Request, response: Response, next: NextFunction) => {
    const validatedUserResponse: ValidationResult = userSchema.validate(req.body, { abortEarly: false});
    if(validatedUserResponse.error) {
        return response.status(400).json({
            message: ERR_MALFORMED_REQUEST,
            errors: validatedUserResponse.error.details.map(error => error.message)
        });
    } 
    next();
}

export { registrationValidator };