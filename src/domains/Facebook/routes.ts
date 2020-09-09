import { Router } from 'express';

import Session from './Session/routes';
import Page from './Page/Router';

const routes = Router();

routes.use('/sessions', Session);
routes.use('/pages', Page);

export default routes;
