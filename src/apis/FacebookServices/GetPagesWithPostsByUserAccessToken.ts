import { FacebookConfig } from '@config/index';

import GetConfiguredAgent from './GetConfiguredAgent';

type Post = {
  id: string;
  message: string;
  full_picture: string;
  created_time: string;
  likes: number;
  comments: number;
  shares: number;
};
class GetPagesWithPostsByUserAccessToken {
  public async execute(
    userAccessToken: string,
  ): Promise<
    Array<{
      id: string;
      name: string;
      thumbnail: string;
      access_token: string;
      likes: string;
      posts: Array<Post>;
    }>
  > {
    try {
      const axios = new GetConfiguredAgent().execute();

      const { data: axiosData } = await axios.get(
        `/${FacebookConfig.apiVersion}/me/accounts`,
        {
          params: {
            fields:
              'id,name,picture{url},fan_count,access_token,' +
              'posts.limit(100){id,message,full_picture,created_time,shares,' +
              'likes.summary(true),comments.summary(true)}',
            access_token: userAccessToken,
          },
        },
      );

      const filterJustPublishedPosts = (post: Post) => 'message' in post;

      const pages = axiosData.data.map(page => ({
        id: page.id,
        name: page.name,
        thumbnail: page.picture.data.url,
        access_token: page.access_token,
        likes: page.fan_count,
        posts: page.posts.data.filter(filterJustPublishedPosts).map(post => ({
          id: post.id,
          message: post.message || post.story,
          full_picture: post.full_picture,
          created_time: post.created_time,
          likes: post.likes.summary.total_count,
          comments: post.comments.summary.total_count,
          shares: post.shares ? post.shares.count : 0,
        })),
      }));

      return pages;
    } catch (error) {
      console.log(error.message);
      console.log(error.response.data.error.message);
    }
  }
}

export default GetPagesWithPostsByUserAccessToken;
