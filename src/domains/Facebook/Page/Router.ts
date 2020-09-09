import { Router } from 'express';

import Controller from './Controller';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const routes = Router();

routes.use(ensureAuthenticated);

routes.get('/', Controller.index);

export default routes;
