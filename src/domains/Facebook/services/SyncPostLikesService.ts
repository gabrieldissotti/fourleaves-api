import { getCustomRepository } from 'typeorm';

import GetLikesByPostId from '@apis/FacebookServices/GetLikesByPostId';
import PostLikeRepository from '@repositories/PostLikeRepository';

class SyncPostLikesService {
  public async execute(
    pageAccessToken: string,
    post_id: string,
  ): Promise<void> {
    console.log('entrou aqui');
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
        await postLikeRepository.save(likes);
      }

      if (after && likes.length) {
        await recursiveSync(after);
      }
    }

    recursiveSync();
  }
}

export default SyncPostLikesService;
