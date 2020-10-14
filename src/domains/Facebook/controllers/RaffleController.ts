import AppController from '@core/AppController';
import { Request, Response } from 'express';
import RaffleAUserService from '../services/RaffleAUserService';

class RaffleController implements AppController {
  public async store(request: Request, response: Response) {
    const { id: userId } = request.user;

    const { postId, requirements } = request.body;

    if (!postId) {
      return response
        .status(400)
        .json({ message: 'Should you send postId param to raffle a post' });
    }

    if (!requirements.length) {
      return response.status(400).json({
        message: 'Least one requirement is required',
      });
    }

    const pages = await new RaffleAUserService().execute(
      userId,
      postId,
      requirements,
    );

    return response.json(pages);
  }
}

export default new RaffleController();
