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

@Entity('post_comments')
class PostComment {
  @PrimaryColumn()
  user_id: string;

  @PrimaryColumn()
  post_id: string;

  @ManyToOne(() => User, user => user.post_comments, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  message: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default PostComment;
