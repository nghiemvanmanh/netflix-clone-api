import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDeleteProfiles1749275691910 implements MigrationInterface {
    name = 'UpdateDeleteProfiles1749275691910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_1f994a87bfd0954b27d702917ff"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP COLUMN "reviewsId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profiles" ADD "reviewsId" uuid`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_1f994a87bfd0954b27d702917ff" FOREIGN KEY ("reviewsId") REFERENCES "reviews"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
