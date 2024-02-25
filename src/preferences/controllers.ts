import { HTTP_CODES } from "../constants";
import { PreferencesServices } from "./services";

const getPreferences = async(req: any, res: any) => {
    const preferences = await PreferencesServices.getPreferences(req);
    return res.status(HTTP_CODES.OK).json(preferences);
}

const updatePreferences = async(req: any, res: any) => {
    await PreferencesServices.updatePreferences(req);
    return res.status(HTTP_CODES.OK).send("Updated the user preferences");
}


export { getPreferences, updatePreferences };