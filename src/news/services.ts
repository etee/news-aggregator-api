import redisClient from "../clients/redis.client";
import { HTTP_CODES, WORLD_NEWS_API_URL } from "../constants";
import { readFromDatabase } from "../utils/file-transaction";
import { formattedPreferences, newsPromise } from "../utils/news";

const getNews = async(req: any, res: any) => {
    const { id, preferences } = req.user;
    let newsResults: any;
    let usersData = JSON.parse(JSON.stringify(readFromDatabase()));
    //const userIndex = usersData.findIndex((user: User) => user.id === id);
    let isCached = false;
    try {
        const pref = formattedPreferences(preferences, 'newsDataIO');
        const cacheNewsData = await redisClient.get(`news:${pref}`);
        if(cacheNewsData) {
            isCached = true;
            newsResults = JSON.parse(cacheNewsData);
            console.log(`${WORLD_NEWS_API_URL}${pref}`);
            res.status(200).json(newsResults);
        } else {
            console.log("Else block");
            newsResults = await newsPromise(`${WORLD_NEWS_API_URL}${pref}`);
            console.log(`${WORLD_NEWS_API_URL}${pref}`);
            if (newsResults.length === 0) {
                throw "API returned an empty array";
            }
            await redisClient.set(`news:${pref}`, JSON.stringify(newsResults));
            res.status(200).send({
                fromCache: isCached,
                data: newsResults,
            });
        }
        
    } catch {
        console.log('Error');
        res.status(404).send("Data unavailable");
    }
    
};

export const NewsPreferences = { getNews };