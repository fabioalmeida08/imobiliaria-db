import { MigrationInterface, QueryRunner } from "typeorm";

export class addColumnCreatedAtUpdateAtClients1652882437207 implements MigrationInterface {
    name = 'addColumnCreatedAtUpdateAtClients1652882437207'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "created_at"`);
    }

}
