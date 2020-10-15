import { EntityRepository, Repository } from 'typeorm';
import PostShare from '@models/PostShare';

@EntityRepository(PostShare)
class PostShareRepository extends Repository<PostShare> {}

export default PostShareRepository;
