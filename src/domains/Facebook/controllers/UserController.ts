import AppController from '@core/AppController';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import AccessTokenRepository from '@repositories/AccessTokenRepository';

class UserController implements AppController {
  public async show(request: Request, response: Response): Promise<Response> {
    const accessTokenRepository = getCustomRepository(AccessTokenRepository);

    const {
      user_id,
      user_name,
      picture_url,
    } = await accessTokenRepository.findOne({
      where: {
        user_id: request.user.id,
      },
    });

    return response.json({ user_id, user_name, picture_url });
  }
}

export default new UserController();
