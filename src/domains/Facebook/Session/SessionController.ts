import AppController from '@core/AppController';
import { Request, Response } from 'express';
import AuthenticateUserService from './services/AuthenticateUserService';

import { ConfigFrontend } from '@config/index';

class SessionController implements AppController {
  public async store(request: Request, response: Response) {
    const { error, code } = request.query;

    if (!code) {
      throw new Error('Código inválido');
    }
    /*
      [x] obter access token
      [x] salvar access token no back para consultas futuras, implementando jwt e repository
      [ ] adicionar segurança do state entre front, fb e back
      [ ] cifrar data no back e decifrar no front pra não aparecer tudo na url
      [ ] lidar com erros


      // TODO: implement a session store suggested in https://github.com/expressjs/session#compatible-session-stores
    */

    if (error) {
      console.log(error);
      throw new Error('facebook returns an error');
    }

    const authenticateUserService = new AuthenticateUserService();

    const { user, token } = await authenticateUserService.execute(
      code as string,
    );

    return response.redirect(
      `${ConfigFrontend.baseURL}?data=${JSON.stringify({ user, token })}`,
    );
  }
}

export default new SessionController();
