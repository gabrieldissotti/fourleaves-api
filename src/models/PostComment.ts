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

  @Column()
  name: string;

  @Column()
  picture_url: string;

  @Column()
  message: string;

  @Column()
  profile_link: string;
}

export default PostComment;
