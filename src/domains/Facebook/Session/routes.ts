import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import SessionController from './SessionController';
import UserController from './UserController';

const routes = Router();

routes.get('/', SessionController.store);

routes.use(ensureAuthenticated);

routes.get('/me', UserController.show);

export default routes;
