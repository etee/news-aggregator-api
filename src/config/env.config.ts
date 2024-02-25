import dotenv from 'dotenv';
dotenv.config();

const { PORT, JWT_SECRET, WORLD_NEWS_APIKEY, NEWS_DATA_IO_APIKEY, REDIS_URL } = process.env;

export {
    PORT,
    JWT_SECRET,
    WORLD_NEWS_APIKEY,
    NEWS_DATA_IO_APIKEY,
    REDIS_URL
}