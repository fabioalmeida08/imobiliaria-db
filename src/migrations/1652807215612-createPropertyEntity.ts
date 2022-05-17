import { MigrationInterface, QueryRunner } from "typeorm";

export class createPropertyEntity1652807215612 implements MigrationInterface {
    name = 'createPropertyEntity1652807215612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "property" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying NOT NULL, "street" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "postal_code" character varying NOT NULL, "country" character varying NOT NULL, "area" double precision NOT NULL, "complement" character varying NOT NULL, "availability" boolean NOT NULL DEFAULT true, "acquisition_type" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "bathroom_number" integer, "bedroom_number" integer, "parking_spaces" integer, "elevator" integer, "party_hall" boolean DEFAULT false, "party_area" boolean DEFAULT false, "gtill" boolean DEFAULT false, "swimming_pool" boolean DEFAULT false, "gym" boolean DEFAULT false, "playground" boolean DEFAULT false, "sports_court" boolean DEFAULT false, "description" character varying NOT NULL, CONSTRAINT "PK_d80743e6191258a5003d5843b4f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "property"`);
    }

}
