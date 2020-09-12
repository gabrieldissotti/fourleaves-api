import AppController from '@core/AppController';
import { Request, Response } from 'express';
import AuthenticateUserService from './services/AuthenticateUserService';

import { ConfigFrontend } from '@config/index';

type Query = {
  error?: any;
  code?: string;
  state?: {
    platform?: string;
  };
};
class SessionController implements AppController {
  public async store(
    request: Request,
    response: Response,
  ): Promise<Response | void> {
    const { error, code, state }: Query = request.query;

    if (!code) {
      throw new Error('Código inválido');
    }
    /*
      [x] obter access token
      [x] salvar access token no back para consultas futuras, implementando jwt e repository
      [ ] testar se esse fluxo atente mobile
      [ ] cifrar data no back e decifrar no front pra não aparecer tudo na url
      [ ] lidar com erros
      [ ] adicionar rota pra deslogar
      [ ] verificar fluxo de login completo pra ver se faltam tratativas


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

    console.log(state);
    const htmlResponse = JSON.stringify({
      user,
      token,
    });

    console.log(htmlResponse);

    if (state.platform !== 'web') {
      return response.send(`
       <script>
          const response = '${htmlResponse}';
          window.ReactNativeWebView.postMessage(response)
       </script>
      `);
    }

    return response.redirect(
      `${ConfigFrontend.baseURL}?data=${JSON.stringify({ user, token })}`,
    );
  }
}

export default new SessionController();
