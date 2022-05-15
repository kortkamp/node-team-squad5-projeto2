/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { MigrationInterface, QueryRunner, TableUnique } from 'typeorm';

export class AlterUserDropUniqueCNPJ1652635143906
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('users');

    for (const unique of table.uniques) {
      if (unique.columnNames.includes('CNPJ')) {
        await queryRunner.dropUniqueConstraint('users', unique.name);
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createUniqueConstraint(
      'users',
      new TableUnique({ columnNames: ['CNPJ'] }),
    );
  }
}
