import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateNotifi1748858462880 implements MigrationInterface {
    name = 'UpdateNotifi1748858462880'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notifications" ADD "movieId" character varying`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "movieTitle" character varying`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "movieImage" character varying`);
        await queryRunner.query(`ALTER TABLE "notifications" ALTER COLUMN "title" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notifications" ALTER COLUMN "message" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notifications" ALTER COLUMN "message" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notifications" ALTER COLUMN "title" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "movieImage"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "movieTitle"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "movieId"`);
    }

}
