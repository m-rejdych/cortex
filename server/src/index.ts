import express from 'express';
import { config } from 'dotenv';

import { router as assistantRouter } from './routers/assistant';

config();

const HOST = process.env.HOST ?? 'localhost';
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8080;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/assistant', assistantRouter);

app.listen(PORT, HOST, () => console.log(`Listening on http://${HOST}:${PORT}`));
