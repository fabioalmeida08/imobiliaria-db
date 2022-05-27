import { MigrationInterface, QueryRunner } from "typeorm";

export class addDeleteCascadeImages1653314437707 implements MigrationInterface {
    name = 'addDeleteCascadeImages1653314437707'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_9c817df4bfb32b94e50ad07e4e0"`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_9c817df4bfb32b94e50ad07e4e0" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_9c817df4bfb32b94e50ad07e4e0"`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_9c817df4bfb32b94e50ad07e4e0" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
