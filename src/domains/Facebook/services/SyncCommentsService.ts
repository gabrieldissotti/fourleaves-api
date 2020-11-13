import { getCustomRepository } from 'typeorm';

import GetCommentsByPostId from '@apis/FacebookServices/GetCommentsByPostId';
import PostCommentRepository from '@repositories/PostCommentRepository';

class SyncCommentsService {
  public async execute(
    pageAccessToken: string,
    post_id: string,
  ): Promise<void> {
    const postCommentRepository = await getCustomRepository(
      PostCommentRepository,
    );

    const getCommentsByPostIdService = new GetCommentsByPostId();

    async function recursiveSync(afterParam?: string) {
      console.log(`recursiveSync ${afterParam}`);

      const { comments, after } = await getCommentsByPostIdService.execute({
        pageAccessToken,
        postId: post_id,
        ...(afterParam && { after: afterParam }),
      });

      if (comments.length) {
        await postCommentRepository.save(
          comments.map(comment => ({
            ...comment,
            user: {
              id: comment.user_id,
              name: comment.name,
              picture_url: comment.pictureUrl,
              profile_link: comment.profileLink,
            },
          })),
        );
      }

      if (after && comments.length) {
        await recursiveSync(after);
      }
    }

    recursiveSync();
  }
}

export default SyncCommentsService;
