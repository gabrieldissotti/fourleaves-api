import FacebookLibrary from '@libraries/Facebook';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';

import AccessTokenRepository from '../repositories/AccessTokenRepository';

import { JWTConfig } from '@config/index';

class AuthenticateUserService {
  public async execute(code: string): Promise<string> {
    const accessTokenRepository = getCustomRepository(AccessTokenRepository);

    const { access_token } = await FacebookLibrary.confirmIdentity(code);

    const user = await FacebookLibrary.getUser(access_token);

    if (!user) {
      throw new Error('User not found');
    }

    const accessTokenToStore = accessTokenRepository.create({
      user_id: user.id,
      user_name: user.name,
      picture_url: user.picture.data.url,
      access_token: access_token,
    });
    await accessTokenRepository.save(accessTokenToStore);

    const jwtToken = sign({}, JWTConfig.secret, {
      subject: user.id,
      expiresIn: JWTConfig.expiresIn,
    });

    return jwtToken;
  }
}

export default AuthenticateUserService;
