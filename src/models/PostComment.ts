import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('post_comments')
class PostComment {
  @PrimaryColumn()
  user_id: string;

  @PrimaryColumn()
  post_id: string;

  @Column()
  name: string;

  @Column()
  picture_url: string;

  @Column()
  message: string;

  @Column()
  profile_link: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default PostComment;
