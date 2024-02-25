import {
  ERR_INTERNAL_SERVER_ERROR,
  ERR_UNREGISTERED_USER,
  HTTP_CODES,
  SUCCESSFUL_PREFERENCE_UPDATED,
} from "../constants";
import { User } from "../models/user.model";
import { readFromDatabase, writeToDatabase } from "../utils/file-transaction";

const getPreferences = (request: any) => {
  return request.user.preferences;
};

const updatePreferences = async (request: any) => {
  let users = await readFromDatabase();
  let userIndex: number = -1;
  if (users.length > 0) {
    userIndex = users.findIndex((user: any) => user.id === request.user.id);
  }
  users[userIndex].preferences = { ...request.body };
  try {
    await writeToDatabase(users);
    return {
      status: HTTP_CODES.OK,
      message: SUCCESSFUL_PREFERENCE_UPDATED,
    };
  } catch {
    return {
      status: HTTP_CODES.INTERNAL_SERVER_ERROR,
      message: ERR_INTERNAL_SERVER_ERROR,
    };
  }
};

export const PreferencesServices = {
  getPreferences,
  updatePreferences,
};
