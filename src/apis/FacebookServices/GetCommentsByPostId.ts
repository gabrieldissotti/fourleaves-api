import { FacebookConfig } from '@config/index';

import GetConfiguredAgent from './GetConfiguredAgent';

type Comments = Array<{
  name: string;
  pictureUrl: string;
  user_id: string;
  post_id: string;
  message: string;
  profileLink?: string;
}>;

type Response = {
  comments: Comments;
  after?: string;
};

type Request = {
  pageAccessToken: string;
  postId: string;
  after?: string;
};

class GetCommentsByPostId {
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
            fields: `comments${afterOrEmpty}.limit(100){from{id,name,link,picture{url}},message}`,
            access_token: pageAccessToken,
          },
        },
      );

      if (!axiosData.comments) {
        return {
          comments: [],
        };
      }

      const comments: Comments = axiosData.comments.data.map(comment => ({
        user_id: comment.from.id,
        post_id: postId,
        name: comment.from.name,
        picture_url: comment.from.picture.data.url,
        message: comment.message,
        profile_link: comment.link,
      }));

      return {
        comments,
        after: axiosData.comments.paging.cursors.after,
      };
    } catch (error) {
      console.log(error.message);
      console.log(error.response.data.error.message);
    }
  }
}

export default GetCommentsByPostId;
