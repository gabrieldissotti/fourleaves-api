import { EntityRepository, Repository } from 'typeorm';
import PostLike from '@models/PostLike';

@EntityRepository(PostLike)
class PostLikeRepository extends Repository<PostLike> {}

export default PostLikeRepository;
