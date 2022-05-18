import { MigrationInterface, QueryRunner } from "typeorm";

export class addColumnCreatedAtUpdateAtImages1652883008614 implements MigrationInterface {
    name = 'addColumnCreatedAtUpdateAtImages1652883008614'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "images" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "created_at"`);
    }

}
