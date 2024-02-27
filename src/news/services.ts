import redisClient from "../clients/redis.client";
import { HTTP_CODES, NEWS_DATA_IO_API_URL, NEWS_DATA_IO_SOURCE, WORLD_NEWS_API_URL, WORLD_NEWS_SOURCE } from "../constants";
import { News } from "../models/news.model";
import { Preferences } from "../models/preferences.model";
import { User } from "../models/user.model";
import { readFromDatabase } from "../utils/file-transaction";
import { formatAPIResponse, formattedPreferences, newsPromise } from "../utils/news";


const fetchNews = async(newsSource: string, url: string, preferences: Preferences) => {
    const formattedPref = formattedPreferences(preferences, newsSource);
    const news = await newsPromise(url+formattedPref);
    return formatAPIResponse(news, newsSource);
}  

const handleSuccessResponse = (res: any, isCached: boolean, newsResults: any) => {
    if(newsResults.length === 0) {
        return res.status(HTTP_CODES.NOT_FOUND).json("No news found");
    }
    return res.status(HTTP_CODES.OK).send({
        fromCache: isCached,
        data: newsResults,
    });
}

const handleErrorResponse = (res: any, error: string) => {
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json(error);
}

const getNews = async(req: any, res: any) => {
    const { id, preferences } = req.user;
    let newsResults: any = [], newsResultsFromWorldNews: News[] = [], newsResultsFromNewsDataIO: News[] = [];
    let usersData = JSON.parse(JSON.stringify(await readFromDatabase()));
    const userIndex = usersData.findIndex((user: User) => user.id === id);
    const date = new Date().toLocaleDateString();
    const CACHE_KEY = `user${userIndex}-news-${date}`;
    let isCached = false;
    try {
        const cacheNewsData = await redisClient.get(CACHE_KEY);
        if(cacheNewsData) {
            isCached = true;
            newsResults = JSON.parse(cacheNewsData);
        } 
        if (!isCached || newsResults.length === 0) {
            newsResultsFromWorldNews = await fetchNews(WORLD_NEWS_SOURCE, WORLD_NEWS_API_URL, preferences);
            newsResultsFromNewsDataIO = await fetchNews(NEWS_DATA_IO_SOURCE, NEWS_DATA_IO_API_URL, preferences);
            newsResults = newsResultsFromWorldNews.concat(newsResultsFromNewsDataIO);
            if (newsResults.length === 0) {
                handleSuccessResponse(res, isCached, newsResults);
            }
            await redisClient.set(CACHE_KEY, JSON.stringify(newsResults));
        }
        handleSuccessResponse(res, isCached, newsResults);
    } catch (error) {
        handleErrorResponse(res, error);
    }  
};

export const NewsPreferences = { getNews };