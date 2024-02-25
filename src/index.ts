import express from 'express';
import { incomingLogs, outgoingLogs } from './middlewares/logger';
import authRoutes from './v1/routes/auth.routes';
import preferencesRoutes from './v1/routes/preferences.routes';
import newsRoutes from './v1/routes/news.routes';

const app = express();

app.use(incomingLogs);
app.use(outgoingLogs);
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/preferences', preferencesRoutes);
app.use('/api/v1/news', newsRoutes);

app.get("/", (req, res) => {
    res.status(200).send("Welcome to News Agrregator App")
});

export default app;