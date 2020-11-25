import { getCustomRepository } from 'typeorm';

import GetLikesByPostId from '@apis/FacebookServices/GetLikesByPostId';
import PostLikeRepository from '@repositories/PostLikeRepository';
import UserRepository from '@repositories/UserRepository';

type Likes = Array<{
  name: string;
  user_id: string;
  post_id: string;
  message: string;
  profileLink?: string;
}>;

class SyncPostLikesService {
  private postLikeRepository: PostLikeRepository;
  private userRepository: UserRepository;
  private getLikesByPostIdService: GetLikesByPostId;

  constructor() {
    this.postLikeRepository = getCustomRepository(PostLikeRepository);
    this.userRepository = getCustomRepository(UserRepository);
    this.getLikesByPostIdService = new GetLikesByPostId();
  }

  public async execute(
    pageAccessToken: string,
    post_id: string,
  ): Promise<void> {
    await this.recursiveSync(pageAccessToken, post_id);
  }

  async recursiveSync(
    pageAccessToken: string,
    post_id: string,
    afterParam?: string,
  ): Promise<void> {
    try {
      console.log(`recursiveSync ${afterParam}`);

      const { likes, after } = await this.getLikesByPostIdService.execute({
        pageAccessToken,
        postId: post_id,
        after: afterParam,
      });

      if (!likes.length) {
        return;
      }

      await this.saveUsers(likes);

      await this.saveLikes(likes);

      if (after) {
        await this.recursiveSync(pageAccessToken, post_id, after);
      }
    } catch (error) {
      console.log(error);
    }
  }

  private async saveUsers(likes: Likes) {
    const usersObjects = likes.map(like => ({
      id: like.user_id,
      name: like.name,
      profile_link: like.profileLink,
    }));

    const usersEntities = await this.userRepository.create(usersObjects);

    await this.userRepository.save(usersEntities);
  }

  private async saveLikes(likes: Likes) {
    const likesObjects = likes.map(like => ({
      user_id: like.user_id,
      post_id: like.post_id,
    }));

    const likesEntities = await this.postLikeRepository.create(likesObjects);

    await this.postLikeRepository.save(likesEntities);
  }
}

export default SyncPostLikesService;
