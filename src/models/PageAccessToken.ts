import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('pages_access_tokens')
class PageAccessToken {
  @PrimaryColumn()
  user_id: string;

  @PrimaryColumn()
  page_id: string;

  @Column()
  access_token: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default PageAccessToken;
