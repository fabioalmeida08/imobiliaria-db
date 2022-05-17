import { MigrationInterface, QueryRunner } from "typeorm";

export class createOneToManyPropertiesClientsRealtor1652812505886 implements MigrationInterface {
    name = 'createOneToManyPropertiesClientsRealtor1652812505886'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "property" ADD "clientSellerId" uuid`);
        await queryRunner.query(`ALTER TABLE "property" ADD "realtorCreatorId" uuid`);
        await queryRunner.query(`ALTER TABLE "property" ADD CONSTRAINT "FK_e8e8e97223d5bbcba3b8b44aadb" FOREIGN KEY ("clientSellerId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "property" ADD CONSTRAINT "FK_6a2d37a4bc25bb99de7ad94b15f" FOREIGN KEY ("realtorCreatorId") REFERENCES "realtor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "property" DROP CONSTRAINT "FK_6a2d37a4bc25bb99de7ad94b15f"`);
        await queryRunner.query(`ALTER TABLE "property" DROP CONSTRAINT "FK_e8e8e97223d5bbcba3b8b44aadb"`);
        await queryRunner.query(`ALTER TABLE "property" DROP COLUMN "realtorCreatorId"`);
        await queryRunner.query(`ALTER TABLE "property" DROP COLUMN "clientSellerId"`);
    }

}
