import { getCustomRepository } from 'typeorm';

import GetCommentsByPostId from '@apis/FacebookServices/GetCommentsByPostId';
import PostCommentRepository from '@repositories/PostCommentRepository';
import UserRepository from '@repositories/UserRepository';

type Comments = Array<{
  name: string;
  pictureUrl: string;
  user_id: string;
  post_id: string;
  message: string;
  profileLink?: string;
}>;

class SyncCommentsService {
  private userRepository: UserRepository;
  private postCommentRepository: PostCommentRepository;
  private getCommentsByPostIdService: GetCommentsByPostId;

  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
    this.postCommentRepository = getCustomRepository(PostCommentRepository);
    this.getCommentsByPostIdService = new GetCommentsByPostId();
  }

  public async execute(
    pageAccessToken: string,
    post_id: string,
  ): Promise<void> {
    await this.recursiveSync(pageAccessToken, post_id);
  }

  private async recursiveSync(
    pageAccessToken: string,
    post_id: string,
    afterParam?: string,
  ) {
    console.log(`recursiveSync ${afterParam}`);

    const { comments, after } = await this.getCommentsByPostIdService.execute({
      pageAccessToken,
      postId: post_id,
      after: afterParam,
    });

    if (!comments.length) {
      return;
    }

    const filteredComments = this.filterACommentByUser(comments);

    await this.saveUsers(filteredComments);

    await this.saveComments(filteredComments);

    if (after) {
      await this.recursiveSync(pageAccessToken, post_id, after);
    }
  }

  private filterACommentByUser(commentsParam: Comments): Comments {
    return commentsParam.reduce((comments, comment) => {
      const userAlreadyExists =
        comments && comments.find(({ user_id }) => user_id === comment.user_id);

      if (userAlreadyExists) {
        return comments;
      }

      return [...comments, comment];
    }, []);
  }

  private async saveUsers(comments: Comments): Promise<void> {
    const users = comments.map(comment => ({
      id: comment.user_id,
      name: comment.name,
      picture_url: comment.pictureUrl,
      profile_link: comment.profileLink,
    }));

    const userEntities = this.userRepository.create(users);

    console.log('userEntities', userEntities);

    await this.userRepository.save(userEntities);
  }

  private async saveComments(comments: Comments): Promise<void> {
    const commentsObjects = comments.map(comment => ({
      user_id: comment.user_id,
      post_id: comment.post_id,
      message: comment.message,
    }));

    const commentsEntities = this.postCommentRepository.create(commentsObjects);

    await this.postCommentRepository.save(commentsEntities);
  }
}

export default SyncCommentsService;
