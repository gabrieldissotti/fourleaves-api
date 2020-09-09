import AppController from '@core/AppController';
import { Request, Response } from 'express';

class PageController implements AppController {
  public async index(request: Request, response: Response) {
    const { id } = request.user;

    // TODO // continuar a obter página após resolver onde armazenar access_tokens

    return response.json({ user_id: id, access_token: 123 });
  }
}

export default new PageController();
