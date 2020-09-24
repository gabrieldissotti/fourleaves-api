import { Router } from 'express';

import Session from './Session/routes';
import Page from './Page/Router';
import ensureAuthenticated from './middlewares/ensureAuthenticated';

const routes = Router();

routes.use('/sessions', Session);

routes.use(ensureAuthenticated);

routes.use('/pages', Page);

export default routes;
