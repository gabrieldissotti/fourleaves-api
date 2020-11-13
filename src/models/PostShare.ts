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

@Entity('post_shares')
class PostShare {
  @PrimaryColumn()
  user_id: string;

  @PrimaryColumn()
  post_id: string;

  @ManyToOne(() => User, user => user.post_shares, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default PostShare;
