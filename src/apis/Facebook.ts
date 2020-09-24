import axios, { AxiosInstance } from 'axios';
import { FacebookConfig } from '@config/index';

class Facebook {
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

  public async getPages(userAccessToken: string) {
    try {
      const { data: axiosData } = await this.agent.get(
        `/${FacebookConfig.apiVersion}/me/accounts`,
        {
          params: {
            fields: 'name,id,picture',
            access_token: userAccessToken,
          },
        },
      );

      const pages = axiosData.data.map(page => ({
        id: page.id,
        name: page.name,
        thumbnail: page.picture.data.url,
      }));

      return pages;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Facebook();
