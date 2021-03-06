import { getCustomRepository } from 'typeorm';

import PageAccessTokenRepository from '@repositories/PageAccessTokenRepository';
import SyncCommentsService from './SyncCommentsService';
import SyncPostLikesService from './SyncPostLikesService';
import SyncPostSharesService from './SyncPostSharesService';
import UserRepository from '@repositories/UserRepository';

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
    statistics: {
      ranked_users_amount: number;
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

    const sync = [];

    if (requirements.includes('comment_in_post')) {
      sync.push(new SyncCommentsService().execute(access_token, post_id));
    }

    if (requirements.includes('like_post')) {
      sync.push(new SyncPostLikesService().execute(access_token, post_id));
    }

    if (requirements.includes('share_post')) {
      sync.push(new SyncPostSharesService().execute(access_token, post_id));
    }

    await Promise.all(sync);

    const userRepository = getCustomRepository(UserRepository);

    const ratedUsers = await userRepository.getRatedUsers(
      post_id,
      requirements,
    );

    if (!ratedUsers.length) {
      return {
        winner: {
          id: '0',
          name: 'Ninguém',
          profileLink: '',
          pictureUrl: '',
        },
        statistics: {
          ranked_users_amount: 0,
        },
      };
    }

    const randomIndex = Math.floor(Math.random() * ratedUsers.length);

    const { id, name, picture_url, profile_link } = ratedUsers[randomIndex];

    const response = {
      winner: {
        id,
        name,
        pictureUrl: picture_url,
        profileLink: profile_link,
      },
      statistics: {
        ranked_users_amount: ratedUsers.length,
      },
    };

    return response;
  }
}

export default RaffleAUserService;
