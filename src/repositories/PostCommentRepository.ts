import { EntityRepository, Repository } from 'typeorm';
import PostComment from '@models/PostComment';

@EntityRepository(PostComment)
class PostCommentRepository extends Repository<PostComment> {}

export default PostCommentRepository;
