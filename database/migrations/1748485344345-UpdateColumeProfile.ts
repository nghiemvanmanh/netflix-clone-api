import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateColumeProfile1748485344345 implements MigrationInterface {
    name = 'UpdateColumeProfile1748485344345'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorites" ADD "profileId" integer`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD CONSTRAINT "FK_3892299bb408b3e9031d4d21924" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorites" DROP CONSTRAINT "FK_3892299bb408b3e9031d4d21924"`);
        await queryRunner.query(`ALTER TABLE "favorites" DROP COLUMN "profileId"`);
    }

}
