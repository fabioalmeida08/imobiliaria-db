import { MigrationInterface, QueryRunner } from "typeorm";

export class createSalesEntity1652806219049 implements MigrationInterface {
    name = 'createSalesEntity1652806219049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sales" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "selling_value" numeric(10,2) NOT NULL, "down_payment" numeric(10,2) NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_4f0bc990ae81dba46da680895ea" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "sales"`);
    }

}
