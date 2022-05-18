import { MigrationInterface, QueryRunner } from "typeorm";

export class addColumnCreatedAtUpdateAtProperty1652882632944 implements MigrationInterface {
    name = 'addColumnCreatedAtUpdateAtProperty1652882632944'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "property" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "property" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "property" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "property" DROP COLUMN "created_at"`);
    }

}
