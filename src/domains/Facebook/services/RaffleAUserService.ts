import GetCommentsLikesAndSharesFromPost from '@apis/FacebookServices/GetCommentsLikesAndSharesFromPost';
import { getCustomRepository } from 'typeorm';

import PageAccessTokenRepository from '@repositories/PageAccessTokenRepository';
import SyncCommentsService from './SyncCommentsService';

class RaffleAUserService {
  public async execute(
    user_id: string,
    post_id: string,
    requirements: string[],
  ): Promise<{
    winner: {
      id: string;
      name: string;
      pictureUrl: string;
      profileLink?: string;
    };
  }> {
    const pageAccessTokensRepository = await getCustomRepository(
      PageAccessTokenRepository,
    );

    const { access_token } = await pageAccessTokensRepository.findOne({
      where: {
        user_id,
      },
    });

    if (requirements.includes('comment_in_post')) {
      new SyncCommentsService().execute(access_token, post_id);
    }

    await new GetCommentsLikesAndSharesFromPost().execute(
      access_token,
      post_id,
    );

    const interactions = await new GetCommentsLikesAndSharesFromPost().execute(
      access_token,
      post_id,
    );

    const randomIndex = Math.floor(
      Math.random() * interactions.comments.length,
    );

    const { id, name, pictureUrl, profileLink } = interactions.comments[
      randomIndex
    ];

    const response = {
      winner: {
        id,
        name,
        pictureUrl,
        profileLink,
      },
    };

    return response;
  }
}

export default RaffleAUserService;
