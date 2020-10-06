import ConfirmIdentity from '@apis/FacebookServices/ConfirmIdentity';
import GetUserByAccessToken from '@apis/FacebookServices/GetUserByAccessToken';

import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';

import AccessTokenRepository from '@repositories/AccessTokenRepository';

import { JWTConfig } from '@config/index';

class AuthenticateUserService {
  public async execute(code: string): Promise<string> {
    const accessTokenRepository = getCustomRepository(AccessTokenRepository);

    const { access_token } = await new ConfirmIdentity().execute(code);

    const user = await new GetUserByAccessToken().execute(access_token);

    if (!user) {
      throw new Error('User not found');
    }

    const accessTokenToStore = accessTokenRepository.create({
      user_id: user.id,
      user_name: user.name,
      picture_url: !!user.picture && user.picture.data.url,
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
