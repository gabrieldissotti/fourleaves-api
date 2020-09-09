import { Router } from 'express';

import SessionController from './SessionController';

const routes = Router();

routes.get('/', SessionController.store);

export default routes;
