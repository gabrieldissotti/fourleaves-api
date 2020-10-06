import { FacebookConfig } from '@config/index';

import GetConfiguredAgent from './GetConfiguredAgent';

class GetUserByAccessToken {
  public async execute(
    userAccessToken: string,
  ): Promise<{
    id: string;
    name: string;
    picture: {
      data: {
        url: string;
      };
    };
  }> {
    try {
      const axios = new GetConfiguredAgent().execute();

      const { data: user } = await axios.get(
        `/${FacebookConfig.apiVersion}/me`,
        {
          params: {
            fields: 'id,name,picture{url}',
            access_token: userAccessToken,
          },
        },
      );

      return user;
    } catch (error) {
      console.log(error);
    }
  }
}

export default GetUserByAccessToken;
