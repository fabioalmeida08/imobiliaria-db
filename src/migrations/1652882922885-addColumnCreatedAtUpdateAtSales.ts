import { MigrationInterface, QueryRunner } from "typeorm";

export class addColumnCreatedAtUpdateAtSales1652882922885 implements MigrationInterface {
    name = 'addColumnCreatedAtUpdateAtSales1652882922885'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "created_at"`);
    }

}
