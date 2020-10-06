import { FacebookConfig } from '@config/index';

import GetConfiguredAgent from './GetConfiguredAgent';

class ConfirmIdentity {
  public async execute(
    code: string,
  ): Promise<{
    access_token: string;
  }> {
    try {
      const axios = new GetConfiguredAgent().execute();

      const { data } = await axios.get(
        `/${FacebookConfig.apiVersion}/oauth/access_token`,
        {
          params: {
            client_id: FacebookConfig.appId,
            redirect_uri: FacebookConfig.redirectURI,
            client_secret: FacebookConfig.clientSecret,
            code,
          },
        },
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default ConfirmIdentity;
