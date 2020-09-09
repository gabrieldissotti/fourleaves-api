import { Router } from 'express';

import Facebook from '@domains/Facebook/routes';

const routes = Router();

routes.use('/facebook', Facebook);

export default routes;
