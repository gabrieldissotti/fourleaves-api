import { getCustomRepository } from 'typeorm';

import GetSharesByPostId from '@apis/FacebookServices/GetSharesByPostId';
import PostShareRepository from '@repositories/PostShareRepository';

class SyncPostSharesService {
  public async execute(
    pageAccessToken: string,
    post_id: string,
  ): Promise<void> {
    const postShareRepository = await getCustomRepository(PostShareRepository);

    const getSharesByPostIdService = new GetSharesByPostId();

    async function recursiveSync(afterParam?: string) {
      console.log(`recursiveSync ${afterParam}`);

      const { shares, after } = await getSharesByPostIdService.execute({
        pageAccessToken,
        postId: post_id,
        ...(afterParam && { after: afterParam }),
      });
      if (!shares.length && !after) {
        console.log('nenhum post compartilhado publicamente ainda');
      }

      if (shares.length) {
        await postShareRepository.save(
          shares.map(share => ({
            ...share,
            user: {
              id: share.user_id,
              name: share.name,
              picture_url: share.pictureUrl,
              profile_link: share.profileLink,
            },
          })),
        );
      }

      if (after && shares.length) {
        await recursiveSync(after);
      }
    }

    recursiveSync();
  }
}

export default SyncPostSharesService;
