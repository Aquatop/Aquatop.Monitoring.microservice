import { Router } from 'express';

import MonitoringController from './app/controllers/MonitoringController';

const routes = new Router();

routes.get('/monitoring/:name', MonitoringController.index);

export default routes;
