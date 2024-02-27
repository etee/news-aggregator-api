import express from 'express';
import { incomingLogs, outgoingLogs } from './middlewares/logger';
import authRoutes from './v1/routes/auth.routes';
import preferencesRoutes from './v1/routes/preferences.routes';
import newsRoutes from './v1/routes/news.routes';

const application = express();

application.use(incomingLogs);
application.use(outgoingLogs);
application.use(express.json());

application.use('/api/v1/auth', authRoutes);
application.use('/api/v1/preferences', preferencesRoutes);
application.use('/api/v1/news', newsRoutes);

application.get("/", (req, res) => {
    res.status(200).send("Welcome to News Agrregator API")
});

export default application;