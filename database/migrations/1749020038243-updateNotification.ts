import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateNotification1749020038243 implements MigrationInterface {
    name = 'UpdateNotification1749020038243'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_692a909ee0fa9383e7859f9b406"`);
        await queryRunner.query(`ALTER TABLE "watch_histories" DROP CONSTRAINT "FK_0d3c1acce88c08e1de10bd482ad"`);
        await queryRunner.query(`ALTER TABLE "notifications" RENAME COLUMN "userId" TO "profileId"`);
        await queryRunner.query(`ALTER TABLE "watch_histories" RENAME COLUMN "userId" TO "profileId"`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_53034dfead6f96c1bd0083f4cab" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "watch_histories" ADD CONSTRAINT "FK_2c94db9213c0d0e01cd2e8be229" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "watch_histories" DROP CONSTRAINT "FK_2c94db9213c0d0e01cd2e8be229"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_53034dfead6f96c1bd0083f4cab"`);
        await queryRunner.query(`ALTER TABLE "watch_histories" RENAME COLUMN "profileId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "notifications" RENAME COLUMN "profileId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "watch_histories" ADD CONSTRAINT "FK_0d3c1acce88c08e1de10bd482ad" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_692a909ee0fa9383e7859f9b406" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
