import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('post_likes')
class PostLike {
  @PrimaryColumn()
  user_id: string;

  @PrimaryColumn()
  post_id: string;

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

export default PostLike;
