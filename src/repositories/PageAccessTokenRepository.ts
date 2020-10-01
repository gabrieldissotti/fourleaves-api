import { EntityRepository, Repository } from 'typeorm';
import PageAccessToken from '@models/PageAccessToken';

@EntityRepository(PageAccessToken)
class PageAccessTokenRepository extends Repository<PageAccessToken> {}

export default PageAccessTokenRepository;
