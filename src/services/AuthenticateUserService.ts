import ConfirmIdentity from '@apis/FacebookServices/ConfirmIdentity';
import GetUserByAccessToken from '@apis/FacebookServices/GetUserByAccessToken';

import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';

import UserRepository from '@repositories/UserRepository';

import { JWTConfig } from '@config/index';
import AccessTokenRepository from '@repositories/AccessTokenRepository';

class AuthenticateUserService {
  public async execute(code: string): Promise<string> {
    try {
      const { access_token } = await new ConfirmIdentity().execute(code);

      const user = await new GetUserByAccessToken().execute(access_token);

      if (!user) {
        throw new Error('User not found');
      }

      const userRepository = getCustomRepository(UserRepository);
      const accessTokenRepository = getCustomRepository(AccessTokenRepository);

      const userToStore = userRepository.create({
        id: user.id,
        name: user.name,
        picture_url: !!user.picture && user.picture.data.url,
      });

      const accessTokenToStore = accessTokenRepository.create({
        user_id: user.id,
        access_token,
      });

      await userRepository.save(userToStore);
      await accessTokenRepository.save(accessTokenToStore);

      const jwtToken = sign({}, JWTConfig.secret, {
        subject: user.id,
        expiresIn: JWTConfig.expiresIn,
      });

      return jwtToken;
    } catch (error) {
      console.log(error);
    }
  }
}

export default AuthenticateUserService;
