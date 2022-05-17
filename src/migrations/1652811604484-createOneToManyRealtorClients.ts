import { MigrationInterface, QueryRunner } from "typeorm";

export class createOneToManyRealtorClients1652811604484 implements MigrationInterface {
    name = 'createOneToManyRealtorClients1652811604484'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" ADD "realtorId" uuid`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_52c99e083b8c967e62749418594" FOREIGN KEY ("realtorId") REFERENCES "realtor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_52c99e083b8c967e62749418594"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "realtorId"`);
    }

}
