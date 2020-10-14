import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePostComments1602699057241 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'post_comments',
        columns: [
          {
            name: 'user_id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'picture_url',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'message',
            type: 'varchar',
          },
          {
            name: 'profile_link',
            type: 'varchar',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('post_comments');
  }
}
