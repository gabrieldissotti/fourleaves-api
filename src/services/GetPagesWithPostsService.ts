import GetPagesWithPostsByUserAccessToken from '@apis/FacebookServices/GetPagesWithPostsByUserAccessToken';
import { getCustomRepository } from 'typeorm';

import AccessTokenRepository from '@repositories/AccessTokenRepository';
import SavePagesAccessTokensService from './SavePagesAccessTokensService';

class GetPagesWithPostsService {
  public async execute(
    user_id: string,
  ): Promise<
    Array<{
      id: string;
      name: string;
      thumbnail: string;
      access_token: string;
      likes: string;
      posts: Array<{
        id: string;
        message: string;
        full_picture: string;
        created_time: string;
        likes: number;
        comments: number;
        shares: number;
      }>;
    }>
  > {
    const accessTokensRepository = await getCustomRepository(
      AccessTokenRepository,
    );

    const { access_token } = await accessTokensRepository.findOne({
      where: {
        user_id,
      },
    });

    const pages = await new GetPagesWithPostsByUserAccessToken().execute(
      access_token,
    );

    const savePagesAccessTokensService = new SavePagesAccessTokensService();
    savePagesAccessTokensService.execute(user_id, pages);

    return pages;
  }
}

export default GetPagesWithPostsService;
