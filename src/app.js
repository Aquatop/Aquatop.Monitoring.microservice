import 'dotenv/config';

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import routes from './routes';
import producer from './communication';

import './database';

class App {
  constructor() {
    this.server = express();

    this.producer = producer;

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(helmet());
    this.server.use(cors());
    this.server.use(express.json());

    this.server.use((req, res, next) => {
      req.producer = this.producer;

      return next();
    });
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
