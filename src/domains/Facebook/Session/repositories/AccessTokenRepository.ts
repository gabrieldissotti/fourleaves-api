import { EntityRepository, Repository } from 'typeorm';
import AccessToken from '@models/AccessToken';

@EntityRepository(AccessToken)
class AccessTokenRepository extends Repository<AccessToken> {}

export default AccessTokenRepository;
