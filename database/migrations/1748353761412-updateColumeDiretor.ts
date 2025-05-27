import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateColumeDiretor1748353761412 implements MigrationInterface {
    name = 'UpdateColumeDiretor1748353761412'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "director" RENAME COLUMN "desceription" TO "description"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "director" RENAME COLUMN "description" TO "desceription"`);
    }

}
