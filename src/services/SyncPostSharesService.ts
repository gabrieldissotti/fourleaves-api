import { getCustomRepository } from 'typeorm';

import GetSharesByPostId from '@apis/FacebookServices/GetSharesByPostId';
import PostShareRepository from '@repositories/PostShareRepository';
import UserRepository from '@repositories/UserRepository';

type Shares = Array<{
  name: string;
  pictureUrl: string;
  user_id: string;
  post_id: string;
  profileLink?: string;
}>;

class SyncPostSharesService {
  private postShareRepository: PostShareRepository;
  private getSharesByPostIdService: GetSharesByPostId;
  private userRepository: UserRepository;

  constructor() {
    this.postShareRepository = getCustomRepository(PostShareRepository);
    this.getSharesByPostIdService = new GetSharesByPostId();
    this.userRepository = getCustomRepository(UserRepository);
  }

  public async execute(
    pageAccessToken: string,
    post_id: string,
  ): Promise<void> {
    this.recursiveSync(pageAccessToken, post_id);
  }

  private async recursiveSync(
    pageAccessToken: string,
    post_id: string,
    afterParam?: string,
  ) {
    console.log(`recursiveSync ${afterParam}`);

    const { shares, after } = await this.getSharesByPostIdService.execute({
      pageAccessToken,
      postId: post_id,
      after: afterParam,
    });

    if (!shares.length) {
      return;
    }

    const filteredShares = this.filterAShareByUser(shares);

    this.saveUsers(filteredShares);

    this.saveShares(filteredShares);

    if (after) {
      await this.recursiveSync(pageAccessToken, post_id, after);
    }
  }

  private filterAShareByUser(sharesParam: Shares): Shares {
    return sharesParam.reduce((shares, share) => {
      const userAlreadyExists =
        shares && shares.find(({ user_id }) => user_id === share.user_id);

      if (userAlreadyExists) {
        return shares;
      }

      return [...shares, share];
    }, []);
  }

  private async saveUsers(shares: Shares): Promise<void> {
    const usersObjects = shares.map(share => ({
      id: share.user_id,
      name: share.name,
      picture_url: share.pictureUrl,
      profile_link: share.profileLink,
    }));

    const usersEntities = this.userRepository.create(usersObjects);

    await this.userRepository.save(usersEntities);
  }

  private async saveShares(shares: Shares): Promise<void> {
    const sharesObjects = shares.map(share => ({
      user_id: share.user_id,
      post_id: share.post_id,
    }));

    const usersEntities = this.postShareRepository.create(sharesObjects);

    await this.postShareRepository.save(usersEntities);
  }
}

export default SyncPostSharesService;
