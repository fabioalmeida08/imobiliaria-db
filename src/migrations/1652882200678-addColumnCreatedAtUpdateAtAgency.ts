import { MigrationInterface, QueryRunner } from "typeorm";

export class addColumnCreatedAtUpdateAtAgency1652882200678 implements MigrationInterface {
    name = 'addColumnCreatedAtUpdateAtAgency1652882200678'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agency" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "agency" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agency" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "agency" DROP COLUMN "created_at"`);
    }

}
