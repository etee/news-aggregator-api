import express from 'express';
import verifyToken from '../../middlewares/auth';
import getNews from '../../news/controllers';
const newsRoutes = express.Router();

newsRoutes.use(express.json());

newsRoutes.get("/", verifyToken, getNews);

export default newsRoutes;