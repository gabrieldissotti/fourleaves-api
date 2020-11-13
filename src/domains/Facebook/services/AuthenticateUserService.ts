import ConfirmIdentity from '@apis/FacebookServices/ConfirmIdentity';
import GetUserByAccessToken from '@apis/FacebookServices/GetUserByAccessToken';

import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';

import UserRepository from '@repositories/UserRepository';

import { JWTConfig } from '@config/index';

class AuthenticateUserService {
  public async execute(code: string): Promise<string> {
    const { access_token } = await new ConfirmIdentity().execute(code);
    console.log('access_token', access_token);

    const user = await new GetUserByAccessToken().execute(access_token);

    if (!user) {
      throw new Error('User not found');
    }

    const userRepository = getCustomRepository(UserRepository);

    const userToStore = userRepository.create({
      id: user.id,
      name: user.name,
      picture_url: !!user.picture && user.picture.data.url,
      access_token: {
        user_id: user.id,
        access_token,
      },
    });

    await userRepository.save(userToStore);

    console.log('saved');
    const jwtToken = sign({}, JWTConfig.secret, {
      subject: user.id,
      expiresIn: JWTConfig.expiresIn,
    });

    return jwtToken;
  }
}

export default AuthenticateUserService;
