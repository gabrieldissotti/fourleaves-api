import { getCustomRepository } from 'typeorm';

import GetLikesByPostId from '@apis/FacebookServices/GetLikesByPostId';
import PostLikeRepository from '@repositories/PostLikeRepository';

class SyncPostLikesService {
  public async execute(
    pageAccessToken: string,
    post_id: string,
  ): Promise<void> {
    const postLikeRepository = await getCustomRepository(PostLikeRepository);

    const getLikesByPostIdService = new GetLikesByPostId();

    async function recursiveSync(afterParam?: string) {
      console.log(`recursiveSync ${afterParam}`);

      const { likes, after } = await getLikesByPostIdService.execute({
        pageAccessToken,
        postId: post_id,
        ...(afterParam && { after: afterParam }),
      });

      if (likes.length) {
        await postLikeRepository.save(
          likes.map(like => ({
            ...like,
            user: {
              id: like.user_id,
              name: like.name,
              profile_link: like.profileLink,
            },
          })),
        );
      }

      if (after && likes.length) {
        await recursiveSync(after);
      }
    }

    recursiveSync();
  }
}

export default SyncPostLikesService;
