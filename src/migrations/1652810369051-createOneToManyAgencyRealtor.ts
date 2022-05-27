import { MigrationInterface, QueryRunner } from "typeorm";

export class createOneToManyAgencyRealtor1652810369051 implements MigrationInterface {
    name = 'createOneToManyAgencyRealtor1652810369051'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "realtor" ADD "agencyId" uuid`);
        await queryRunner.query(`ALTER TABLE "realtor" ADD CONSTRAINT "FK_e9e14f33efb07483552b4f760e9" FOREIGN KEY ("agencyId") REFERENCES "agency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "realtor" DROP CONSTRAINT "FK_e9e14f33efb07483552b4f760e9"`);
        await queryRunner.query(`ALTER TABLE "realtor" DROP COLUMN "agencyId"`);
    }

}
