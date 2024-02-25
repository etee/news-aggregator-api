import {
  ERR_EXISTING_USER,
  ERR_INTERNAL_SERVER_ERROR,
  ERR_INVALID_PASSWORD,
  ERR_UNREGISTERED_USER,
  HTTP_CODES,
  SUCCESSFUL_LOGIN,
  SUCCESSFUL_REGISTRATION,
} from "../constants";
import { User } from "../models/user.model";
import { readFromDatabase, writeToDatabase } from "../utils/file-transaction";
import uniqid from "uniqid";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.config";

const registerUser = async (registrationDetails: User) => {
  const users = await readFromDatabase();
  let existingUser = false;
  if (users.length > 0) {
    existingUser = users.find(
      (user: any) => user.email === registrationDetails.email
    );
  }
  if (!existingUser) {
    const id = uniqid();
    registrationDetails.password = bcrypt.hashSync(
      registrationDetails.password,
      8
    );
    const newUser = { ...registrationDetails, id };
    try {
      users.push(newUser);
      await writeToDatabase(users);
      return {
        status: HTTP_CODES.CREATED,
        message: SUCCESSFUL_REGISTRATION,
      };
    } catch {
      return {
        status: HTTP_CODES.INTERNAL_SERVER_ERROR,
        message: ERR_INTERNAL_SERVER_ERROR,
      };
    }
  } else {
    return {
      status: HTTP_CODES.FORBIDDEN,
      message: ERR_EXISTING_USER,
    };
  }
};

const loginUser = async (loginDetails: any) => {
  const users = await readFromDatabase();
  let registeredUser = {} as User;
  if (users.length > 0) {
    registeredUser = users.find(
      (user: any) => user.email === loginDetails.email
    );
  }
  if (!registeredUser) {
    return {
      status: HTTP_CODES.NOT_FOUND,
      message: ERR_UNREGISTERED_USER,
    };
  }
  const comparePassword = bcrypt.compareSync(
    loginDetails.password,
    registeredUser.password
  );
  if (!comparePassword) {
    return {
      status: HTTP_CODES.UNAUTHORIZED,
      message: ERR_INVALID_PASSWORD,
    };
  } else {
    if (JWT_SECRET) {
      const signedToken = jsonwebtoken.sign(
        { id: registeredUser.id },
        JWT_SECRET,
        {
          expiresIn: 86400,
        }
      );
      return {
        status: HTTP_CODES.OK,
        message: SUCCESSFUL_LOGIN,
        token: signedToken,
        user: {
          id: registeredUser.id,
        },
      };
    } else {
      return {
        status: HTTP_CODES.INTERNAL_SERVER_ERROR,
        message: ERR_INTERNAL_SERVER_ERROR,
      };
    }
  }
};

export { registerUser, loginUser };
