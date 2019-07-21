import express from 'express';
import Cors from 'cors';
import bodyParser from 'body-parser';
import logger from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import passport from 'passport';
import 'dotenv/config';

import initDatabase from './utils/initDatabase';
import userRoutes from './api/user/user.routes';
import streamRoutes from './api/stream/stream.routes';
import swaggerOptions from './swaggerOptions';

const app = express();
const API_PORT = process.env.API_PORT || 3000;
const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

import './config/passport';
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(Cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(passport.initialize());

app.use('/user', userRoutes);
app.use('/stream', streamRoutes);


initDatabase().then(async () => {
  app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
}).catch((err) => {
  console.log("Couldn't start app! Check DB connection");
});

export default app;
