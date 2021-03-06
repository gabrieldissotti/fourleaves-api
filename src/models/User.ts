import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import AccessToken from './AccessToken';
import PageAccessToken from './PageAccessToken';
import PostComment from './PostComment';
import PostLike from './PostLike';

import PostShare from './PostShare';

@Entity('users')
class User {
  @PrimaryColumn()
  id: string;

  @OneToMany(() => PostShare, post_share => post_share.user)
  post_shares: PostShare[];

  @OneToMany(() => PostLike, post_likes => post_likes.user)
  post_likes: PostLike[];

  @OneToMany(() => PostComment, post_comments => post_comments.user)
  post_comments: PostComment[];

  @OneToOne(() => AccessToken, access_token => access_token.user)
  access_token: AccessToken;

  @OneToMany(
    () => PageAccessToken,
    page_access_tokens => page_access_tokens.user,
  )
  page_access_tokens: PageAccessToken;

  @Column()
  name: string;

  @Column()
  picture_url: string;

  @Column()
  profile_link: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
