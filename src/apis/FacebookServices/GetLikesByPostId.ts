import { FacebookConfig } from '@config/index';

import GetConfiguredAgent from './GetConfiguredAgent';

type Likes = Array<{
  name: string;
  user_id: string;
  post_id: string;
  message: string;
  profileLink?: string;
}>;

type Response = {
  likes: Likes;
  after?: string;
};

type Request = {
  pageAccessToken: string;
  postId: string;
  after?: string;
};

class GetLikesByPostId {
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
            fields: `likes${afterOrEmpty}.limit(100){name,id,pic,link}`,
            access_token: pageAccessToken,
          },
        },
      );

      if (!axiosData.likes) {
        return {
          likes: [],
        };
      }

      const likes: Likes = axiosData.likes.data.map(like => ({
        user_id: like.id,
        post_id: postId,
        name: like.name,
        picture_url: like.pic,
        profile_link: like.link,
      }));

      return {
        likes,
        after: axiosData.likes.paging.cursors.after,
      };
    } catch (error) {
      console.log(error.message);
      console.log(error.response.data.error.message);
    }
  }
}

export default GetLikesByPostId;
