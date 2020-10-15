import { FacebookConfig } from '@config/index';

import GetConfiguredAgent from './GetConfiguredAgent';

type Shares = Array<{
  name: string;
  pictureUrl: string;
  user_id: string;
  post_id: string;
  profileLink?: string;
}>;

type Response = {
  shares: Shares;
  after?: string;
};

type Request = {
  pageAccessToken: string;
  postId: string;
  after?: string;
};

class GetSharesByPostId {
  public async execute({
    pageAccessToken,
    postId,
    after,
  }: Request): Promise<Response> {
    try {
      const axios = new GetConfiguredAgent().execute();

      const afterOrEmpty = after ? `.after(${after})` : '';

      const { data: axiosData } = await axios.get<any>(
        `/${FacebookConfig.apiVersion}/${postId}`,
        {
          params: {
            fields: `sharedposts${afterOrEmpty}.limit(1){from{id,name,link,picture{url}}}`,
            access_token: pageAccessToken,
          },
        },
      );

      if (!axiosData.sharedposts) {
        return {
          shares: [],
        };
      }

      const shares: Shares = axiosData.sharedposts.data.map(sharedpost => ({
        user_id: sharedpost.from.id,
        post_id: postId,
        name: sharedpost.from.name,
        picture_url: sharedpost.from.picture.data.url,
        profile_link: sharedpost.from.link,
      }));

      return {
        shares,
        after: axiosData.sharedposts.paging.cursors.after,
      };
    } catch (error) {
      console.log(error.message);
      console.log(error.response.data.error.message);
    }
  }
}

export default GetSharesByPostId;
