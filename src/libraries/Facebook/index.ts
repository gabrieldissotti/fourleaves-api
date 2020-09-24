import axios, { AxiosInstance } from 'axios';
import { FacebookConfig } from '@config/index';

class Library {
  private agent: AxiosInstance;

  constructor() {
    this.agent = axios.create({
      baseURL: `${FacebookConfig.baseURL}`,
    });
  }

  public async confirmIdentity(code: string) {
    try {
      const { data } = await this.agent.get(
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

  public async getUser(userAccessToken: string) {
    try {
      const { data: user } = await this.agent.get(
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

export default new Library();
