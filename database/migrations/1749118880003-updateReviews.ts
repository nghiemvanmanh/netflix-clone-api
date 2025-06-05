import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateReviews1749118880003 implements MigrationInterface {
    name = 'UpdateReviews1749118880003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD "profileId" uuid`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD "reviewsId" uuid`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_426d6805968f17a40bf7426e1fa" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_1f994a87bfd0954b27d702917ff" FOREIGN KEY ("reviewsId") REFERENCES "reviews"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_1f994a87bfd0954b27d702917ff"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_426d6805968f17a40bf7426e1fa"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP COLUMN "reviewsId"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "profileId"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
