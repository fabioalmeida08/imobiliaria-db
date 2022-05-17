import { MigrationInterface, QueryRunner } from "typeorm";

export class createRealtorEntity1652803565906 implements MigrationInterface {
    name = 'createRealtorEntity1652803565906'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "realtor" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "phone_number" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e21cee874e95e9c77756a655f1b" UNIQUE ("name"), CONSTRAINT "PK_b7a05ae929387eaab39a2ea0c2f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "realtor"`);
    }

}
