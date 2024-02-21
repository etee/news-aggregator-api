import dotenv from 'dotenv';
dotenv.config();

const { PORT, API_SECRET } = process.env;

export {
    PORT,
    API_SECRET
}