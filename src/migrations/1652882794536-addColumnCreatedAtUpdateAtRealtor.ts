import { MigrationInterface, QueryRunner } from "typeorm";

export class addColumnCreatedAtUpdateAtRealtor1652882794536 implements MigrationInterface {
    name = 'addColumnCreatedAtUpdateAtRealtor1652882794536'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "realtor" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "realtor" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "realtor" DROP CONSTRAINT "UQ_e21cee874e95e9c77756a655f1b"`);
        await queryRunner.query(`ALTER TABLE "realtor" ADD CONSTRAINT "UQ_0b53262aa04ea0f7d2f22d6ff93" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "realtor" DROP CONSTRAINT "UQ_0b53262aa04ea0f7d2f22d6ff93"`);
        await queryRunner.query(`ALTER TABLE "realtor" ADD CONSTRAINT "UQ_e21cee874e95e9c77756a655f1b" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "realtor" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "realtor" DROP COLUMN "created_at"`);
    }

}
