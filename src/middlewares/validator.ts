import { NextFunction, Request, Response } from "express";
import userSchema from "../models/user.model";
import { ValidationResult } from "joi";
import { ERR_MALFORMED_REQUEST, HTTP_CODES } from "../constants";
import preferencesSchema from "../models/preferences.model";

const registrationValidator = (req: Request, response: Response, next: NextFunction) => {
    const validatedUserResponse: ValidationResult = userSchema.validate(req.body, { abortEarly: false});
    if(validatedUserResponse.error) {
        return response.status(HTTP_CODES.BAD_REQUEST).json({
            message: ERR_MALFORMED_REQUEST,
            errors: validatedUserResponse.error.details.map(error => error.message)
        });
    } 
    next();
}

const preferencesValidator = (req: Request, response: Response, next: NextFunction) => {
    const validatedPreferences: ValidationResult = preferencesSchema.validate(req.body, { abortEarly: false});
    if(validatedPreferences.error) {
        return response.status(HTTP_CODES.BAD_REQUEST).json({
            message: ERR_MALFORMED_REQUEST,
            errors: validatedPreferences.error.details.map(error => error.message)
        });
    } 
    next();
}

export { registrationValidator, preferencesValidator };