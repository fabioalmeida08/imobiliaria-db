import { MigrationInterface, QueryRunner } from "typeorm";

export class createAgencyEntity1652800107253 implements MigrationInterface {
    name = 'createAgencyEntity1652800107253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "agency" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "phone_number" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_30e185b1233a7b5a3faedd4524e" UNIQUE ("name"), CONSTRAINT "PK_ab1244724d1c216e9720635a2e5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "agency"`);
    }

}
