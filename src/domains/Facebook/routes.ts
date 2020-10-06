import { Router } from 'express';

import PageController from './controllers/PageController';
import RaffleController from './controllers/RaffleController';
import SessionController from './controllers/SessionController';
import UserController from './controllers/UserController';

import ensureAuthenticated from './middlewares/ensureAuthenticated';

const routes = Router();

routes.get('/sessions', SessionController.store);
routes.get('/sessions/me', ensureAuthenticated, UserController.show);

routes.get('/pages', ensureAuthenticated, PageController.index);
routes.post('/raffle', ensureAuthenticated, RaffleController.store);

export default routes;
