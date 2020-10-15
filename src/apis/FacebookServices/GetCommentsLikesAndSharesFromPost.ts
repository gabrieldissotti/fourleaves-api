import { FacebookConfig } from '@config/index';

import GetConfiguredAgent from './GetConfiguredAgent';

type GetCommentsLikesAndSharesFromPostResponse = {
  likes: Array<{
    id: string;
    name: string;
    pictureUrl: string;
    profileLink?: string;
  }>;
  shares: Array<{
    id: string;
    name: string;
    pictureUrl: string;
    profileLink?: string;
  }>;
  comments: Array<{
    id: string;
    name: string;
    pictureUrl: string;
    message: string;
    profileLink?: string;
  }>;
};

class GetCommentsLikesAndSharesFromPost {
  public async execute(
    pageAccessToken: string,
    postId: string,
  ): Promise<GetCommentsLikesAndSharesFromPostResponse> {
    try {
      const axios = new GetConfiguredAgent().execute();

      const { data: axiosData } = await axios.get<any>(
        `/${FacebookConfig.apiVersion}/${postId}`,
        {
          params: {
            fields:
              'likes.limit(100){name,id,pic,link},sharedposts.limit(100){from{id,name,link,picture{url}},picture},comments.limit(100){from{id,name,link,picture{url}},message}',
            access_token: pageAccessToken,
          },
        },
      );

      const comments = axiosData.comments.data.map(comment => ({
        id: comment.from.id,
        name: comment.from.name,
        pictureUrl: comment.from.picture.data.url,
        message: comment.message,
        profileLink: comment.link,
      }));

      const shares = axiosData.sharedposts.data.map(sharedposts => ({
        id: sharedposts.from.id,
        name: sharedposts.from.name,
        pictureUrl: sharedposts.from.picture.data.url,
        profileLink: sharedposts.from.link,
      }));

      const likes = axiosData.likes.data.map(like => ({
        id: like.id,
        name: like.name,
        pictureUrl: like.pic,
        profileLink: like.link,
      }));

      const response: GetCommentsLikesAndSharesFromPostResponse = {
        likes,
        comments,
        shares,
      };

      return response;
    } catch (error) {
      console.log(error.message);
      console.log(error.response.data.error.message);
    }
  }
}

export default GetCommentsLikesAndSharesFromPost;
