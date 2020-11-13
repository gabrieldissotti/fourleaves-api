import { Router } from 'express';

import PageController from './controllers/PageController';
import RaffleController from './controllers/RaffleController';
import SessionController from './controllers/SessionController';
import UserController from './controllers/UserController';

import ensureAuthenticated from './middlewares/ensureAuthenticated';

const routes = Router();

routes.get('/facebook/sessions', SessionController.store);
routes.get('/facebook/sessions/me', ensureAuthenticated, UserController.show);

routes.get('/facebook/pages', ensureAuthenticated, PageController.index);

routes.post('/facebook/raffle', ensureAuthenticated, RaffleController.store);

export default routes;
