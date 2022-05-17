import { MigrationInterface, QueryRunner } from "typeorm";

export class createImagesEntity1652807441510 implements MigrationInterface {
    name = 'createImagesEntity1652807441510'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "img_url" character varying NOT NULL, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "images"`);
    }

}
