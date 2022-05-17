import { MigrationInterface, QueryRunner } from "typeorm";

export class createRelationsImagePropertySalesRealtors1652814699762 implements MigrationInterface {
    name = 'createRelationsImagePropertySalesRealtors1652814699762'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sales_realtors_realtor" ("salesId" uuid NOT NULL, "realtorId" uuid NOT NULL, CONSTRAINT "PK_e2a0fdc68a2838c0e8e4fd2b7b9" PRIMARY KEY ("salesId", "realtorId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8d8454afff4954ff528fcf9443" ON "sales_realtors_realtor" ("salesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_29ae57ece5196289adb150730d" ON "sales_realtors_realtor" ("realtorId") `);
        await queryRunner.query(`ALTER TABLE "sales" ADD "propertyId" uuid`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "UQ_e0c86bce713c9bddd5b9ab40461" UNIQUE ("propertyId")`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "clientBuyerId" uuid`);
        await queryRunner.query(`ALTER TABLE "images" ADD "propertyId" uuid`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_e0c86bce713c9bddd5b9ab40461" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_9f09156c21bc0f72cb6b8c119e7" FOREIGN KEY ("clientBuyerId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_9c817df4bfb32b94e50ad07e4e0" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales_realtors_realtor" ADD CONSTRAINT "FK_8d8454afff4954ff528fcf94432" FOREIGN KEY ("salesId") REFERENCES "sales"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "sales_realtors_realtor" ADD CONSTRAINT "FK_29ae57ece5196289adb150730d6" FOREIGN KEY ("realtorId") REFERENCES "realtor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales_realtors_realtor" DROP CONSTRAINT "FK_29ae57ece5196289adb150730d6"`);
        await queryRunner.query(`ALTER TABLE "sales_realtors_realtor" DROP CONSTRAINT "FK_8d8454afff4954ff528fcf94432"`);
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_9c817df4bfb32b94e50ad07e4e0"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_9f09156c21bc0f72cb6b8c119e7"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_e0c86bce713c9bddd5b9ab40461"`);
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "propertyId"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "clientBuyerId"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "UQ_e0c86bce713c9bddd5b9ab40461"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "propertyId"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_29ae57ece5196289adb150730d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8d8454afff4954ff528fcf9443"`);
        await queryRunner.query(`DROP TABLE "sales_realtors_realtor"`);
    }

}
