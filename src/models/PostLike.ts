import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';

@Entity('post_likes')
class PostLike {
  @PrimaryColumn()
  user_id: string;

  @PrimaryColumn()
  post_id: string;

  @ManyToOne(() => User, user => user.post_likes)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default PostLike;
