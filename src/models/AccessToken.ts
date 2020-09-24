import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('access_tokens')
class AccessToken {
  @PrimaryColumn()
  user_id: string;

  @Column()
  access_token: string;

  @Column()
  user_name: string;

  @Column()
  picture_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default AccessToken;
