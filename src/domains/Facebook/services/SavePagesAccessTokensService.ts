import { getCustomRepository } from 'typeorm';

import PageAccessTokenRepository from '@repositories/PageAccessTokenRepository';

class SavePagesAccessTokensService {
  public async execute(
    user_id: string,
    pages: Array<{ id: string; access_token: string }>,
  ): Promise<void> {
    const pagesAccessTokensRepository = await getCustomRepository(
      PageAccessTokenRepository,
    );

    const pagesAccessTokensToStore = pages.map(page => {
      return pagesAccessTokensRepository.create({
        user_id,
        page_id: page.id,
        access_token: page.access_token,
      });
    });

    await pagesAccessTokensRepository.save(pagesAccessTokensToStore);
  }
}

export default SavePagesAccessTokensService;
