import { Router } from 'express';

import MonitoringController from './app/controllers/MonitoringController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.use(authMiddleware);

routes.get('/monitoring/:name', MonitoringController.index);

export default routes;
