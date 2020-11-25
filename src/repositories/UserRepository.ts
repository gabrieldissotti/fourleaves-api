import { EntityRepository, Repository } from 'typeorm';
import User from '@models/User';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public async getUsersWithInteractions(post_id): Promise<User[]> {
    const users = await this.createQueryBuilder('user')
      .select('user')
      .innerJoinAndSelect(
        'user.post_likes',
        'post_likes',
        'post_likes.post_id = :post_id',
        {
          post_id,
        },
      )
      .innerJoinAndSelect(
        'user.post_shares',
        'post_shares',
        'post_shares.post_id = :post_id',
        {
          post_id,
        },
      )
      .innerJoinAndSelect(
        'user.post_comments',
        'post_comments',
        'post_comments.post_id = :post_id',
        {
          post_id,
        },
      )
      .getMany();

    return users;
  }
}

export default UserRepository;
