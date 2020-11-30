import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';

@Entity('access_tokens')
class AccessToken {
  @PrimaryColumn()
  user_id: string;

  @Column()
  access_token: string;

  @OneToOne(() => User, user => user.access_token)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default AccessToken;
