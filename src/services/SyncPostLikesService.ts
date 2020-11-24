import { getCustomRepository } from 'typeorm';

import GetLikesByPostId from '@apis/FacebookServices/GetLikesByPostId';
import PostLikeRepository from '@repositories/PostLikeRepository';
import UserRepository from '@repositories/UserRepository';

class SyncPostLikesService {
  public async execute(
    pageAccessToken: string,
    post_id: string,
  ): Promise<void> {
    const postLikeRepository = await getCustomRepository(PostLikeRepository);
    const userRepository = await getCustomRepository(UserRepository);

    const getLikesByPostIdService = new GetLikesByPostId();

    async function recursiveSync(afterParam?: string) {
      console.log(`recursiveSync ${afterParam}`);

      const { likes, after } = await getLikesByPostIdService.execute({
        pageAccessToken,
        postId: post_id,
        ...(afterParam && { after: afterParam }),
      });

      if (likes.length) {
        const usersToSave = await userRepository.create(
          likes.map(like => ({
            id: like.user_id,
            name: like.name,
            profile_link: like.profileLink,
          })),
        );
        await userRepository.save(usersToSave);

        const postLikesToStore = await postLikeRepository.create(likes);
        await postLikeRepository.save(postLikesToStore);
      }

      if (after && likes.length) {
        await recursiveSync(after);
      }
    }

    recursiveSync();
  }
}

export default SyncPostLikesService;
