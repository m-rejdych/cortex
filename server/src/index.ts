import express from 'express';
import { config } from 'dotenv';

import { assistantRouter } from './routers';
import { genericErrorHandler } from './util/error';

config();

const HOST = process.env.HOST ?? 'localhost';
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8080;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/assistant', assistantRouter);
app.use(genericErrorHandler);

app.listen(PORT, HOST, () => console.log(`Listening on http://${HOST}:${PORT}`));
