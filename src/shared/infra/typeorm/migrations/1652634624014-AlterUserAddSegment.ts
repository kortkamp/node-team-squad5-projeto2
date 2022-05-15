import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterUserAddSegment1652634624014 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'segment',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'segment');
  }
}
