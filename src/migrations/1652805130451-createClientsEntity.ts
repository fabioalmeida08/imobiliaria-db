import { MigrationInterface, QueryRunner } from "typeorm";

export class createClientsEntity1652805130451 implements MigrationInterface {
    name = 'createClientsEntity1652805130451'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "phone_number" character varying NOT NULL, "email" character varying NOT NULL, "intention" character varying NOT NULL, CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "clients"`);
    }

}
