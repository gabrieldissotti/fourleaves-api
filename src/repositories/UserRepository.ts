import { EntityRepository, Repository } from 'typeorm';
import User from '@models/User';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public async getRatedUsers(
    post_id: string,
    requirements: string[],
  ): Promise<User[]> {
    const query = this.createQueryBuilder('user').select('user');

    if (requirements.includes('like_post')) {
      query.innerJoinAndSelect(
        'user.post_likes',
        'post_likes',
        'post_likes.post_id = :post_id',
        {
          post_id,
        },
      );
    }

    if (requirements.includes('comment_in_post')) {
      query.innerJoinAndSelect(
        'user.post_comments',
        'post_comments',
        'post_comments.post_id = :post_id',
        {
          post_id,
        },
      );
    }

    if (requirements.includes('share_post')) {
      query.innerJoinAndSelect(
        'user.post_shares',
        'post_shares',
        'post_shares.post_id = :post_id',
        {
          post_id,
        },
      );
    }

    const users = await query.getMany();

    return users;
  }
}

export default UserRepository;
