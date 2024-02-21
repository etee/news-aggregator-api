import Joi from "joi";

export interface User {
    id: string;
    userName: string;
    password: string;
    email: string;
}

export const emptyUser = (): User => {
    return {
        id: '',
        userName: '',
        password: '',
        email: ''
    }

}

const userSchema = Joi.object({
    userName: Joi.string().alphanum().min(5).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
});

export default userSchema;