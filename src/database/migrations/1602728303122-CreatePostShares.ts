import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePostShares1602728303122 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'post_shares',
        columns: [
          {
            name: 'user_id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'post_id',
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
            name: 'profile_link',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('post_shares');
  }
}
