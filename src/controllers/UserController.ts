import AppController from '@core/AppController';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import UserRepository from '@repositories/UserRepository';

class UserController implements AppController {
  public async show(request: Request, response: Response): Promise<Response> {
    const userRepository = getCustomRepository(UserRepository);

    const { id, name, picture_url } = await userRepository.findOne({
      where: {
        id: request.user.id,
      },
    });

    return response.json({
      user_id: id,
      user_name: name,
      picture_url,
    });
  }
}

export default new UserController();
