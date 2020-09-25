import AppController from '@core/AppController';
import { Request, Response } from 'express';
import FacebookAPI from '@apis/Facebook';
import AccessTokenRepository from '@repositories/AccessTokenRepository';
import { getCustomRepository } from 'typeorm';

class PageController implements AppController {
  public async index(request: Request, response: Response) {
    const { id } = request.user;

    const accessTokenRepository = await getCustomRepository(
      AccessTokenRepository,
    );

    const { access_token } = await accessTokenRepository.findOne({
      where: {
        user_id: id,
      },
    });

    const pages = await FacebookAPI.getPages(access_token);

    return response.json(pages);
  }
}

export default new PageController();
