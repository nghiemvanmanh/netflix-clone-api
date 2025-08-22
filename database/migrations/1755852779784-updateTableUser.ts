import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTableUser1755852779784 implements MigrationInterface {
    name = 'UpdateTableUser1755852779784'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isExpired" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isExpired"`);
    }

}
