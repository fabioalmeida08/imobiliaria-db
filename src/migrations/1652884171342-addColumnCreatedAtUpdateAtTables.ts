import { MigrationInterface, QueryRunner } from "typeorm";

export class addColumnCreatedAtUpdateAtTables1652884171342 implements MigrationInterface {
    name = 'addColumnCreatedAtUpdateAtTables1652884171342'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agency" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "agency" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "realtor" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "realtor" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "images" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "images" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "property" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "property" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "realtor" DROP CONSTRAINT "UQ_e21cee874e95e9c77756a655f1b"`);
        await queryRunner.query(`ALTER TABLE "realtor" ADD CONSTRAINT "UQ_0b53262aa04ea0f7d2f22d6ff93" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "realtor" DROP CONSTRAINT "UQ_0b53262aa04ea0f7d2f22d6ff93"`);
        await queryRunner.query(`ALTER TABLE "realtor" ADD CONSTRAINT "UQ_e21cee874e95e9c77756a655f1b" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "property" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "property" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "realtor" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "realtor" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "agency" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "agency" DROP COLUMN "created_at"`);
    }

}
