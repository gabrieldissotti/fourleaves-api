import { Router } from 'express';

import PageController from './controllers/PageController';
import SessionController from './controllers/SessionController';
import UserController from './controllers/UserController';

import ensureAuthenticated from './middlewares/ensureAuthenticated';

const routes = Router();

routes.get('/sessions', SessionController.store);
routes.get('/sessions/me', ensureAuthenticated, UserController.show);

routes.get('/pages', ensureAuthenticated, PageController.index);

export default routes;
