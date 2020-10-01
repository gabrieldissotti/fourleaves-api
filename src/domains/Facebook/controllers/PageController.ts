import AppController from '@core/AppController';
import { Request, Response } from 'express';
import GetPagesWithPostsService from '../services/GetPagesWithPostsService';

class PageController implements AppController {
  public async index(request: Request, response: Response) {
    const { id: userId } = request.user;

    const getPagesWithPostsService = new GetPagesWithPostsService();

    const pages = await getPagesWithPostsService.execute(userId);

    return response.json(pages);
  }
}

export default new PageController();
