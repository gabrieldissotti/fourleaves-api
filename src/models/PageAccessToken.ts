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

@Entity('pages_access_tokens')
class PageAccessToken {
  @PrimaryColumn()
  user_id: string;

  @PrimaryColumn()
  page_id: string;

  @ManyToOne(() => User, user => user.page_access_tokens)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  access_token: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default PageAccessToken;
