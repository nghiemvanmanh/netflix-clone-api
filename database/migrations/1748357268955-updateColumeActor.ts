import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateColumeActor1748357268955 implements MigrationInterface {
    name = 'UpdateColumeActor1748357268955'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "actors" RENAME COLUMN "desceription" TO "description"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "actors" RENAME COLUMN "description" TO "desceription"`);
    }

}
