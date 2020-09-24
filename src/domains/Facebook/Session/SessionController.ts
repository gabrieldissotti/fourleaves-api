import AppController from '@core/AppController';
import { Request, Response } from 'express';
import AuthenticateUserService from './services/AuthenticateUserService';

import { ConfigFrontend } from '@config/index';

type State = { platform?: string };

type Query = {
  error?: any;
  code?: string;
  state?: string;
};

class SessionController implements AppController {
  public async store(
    request: Request,
    response: Response,
  ): Promise<Response | void> {
    const { error, code, state }: Query = request.query;
    const decodedState: State = state ? JSON.parse(state) : null;

    if (!code) {
      throw new Error('Código inválido');
    }
    /*
      [x] obter access token
      [x] salvar access token no back para consultas futuras, implementando jwt e repository
      [x] testar se esse fluxo atente mobile
      [ ]
      [ ] cifrar data no back e decifrar no front pra não aparecer tudo na url
      [ ] lidar com erros
      [ ] adicionar rota pra deslogar
      [ ] verificar fluxo de login completo pra ver se faltam tratativas
    */

    if (error) {
      console.log(error);
      throw new Error('facebook returns an error');
    }

    const authenticateUserService = new AuthenticateUserService();

    const token = await authenticateUserService.execute(code as string);

    if (decodedState.platform !== 'web') {
      return response.send(`
       <script>
          const token = '${token}';
          window.ReactNativeWebView.postMessage(token)
       </script>
      `);
    }

    return response.redirect(`${ConfigFrontend.baseURL}?token=${token}`);
  }
}

export default new SessionController();
