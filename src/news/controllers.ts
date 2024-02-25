import { HTTP_CODES } from "../constants";
import { NewsPreferences } from "./services";

const getNews = async(req: any, res: any) => {
    const news = await NewsPreferences.getNews(req, res);
    return res.status(HTTP_CODES.OK).json(news);
}

export default getNews;