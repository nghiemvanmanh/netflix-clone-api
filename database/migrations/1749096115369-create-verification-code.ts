import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateVerificationCode1749096115369 implements MigrationInterface {
    name = 'CreateVerificationCode1749096115369'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "verification_code" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "code" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "isUsed" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_d702c086da466e5d25974512d46" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "verification_code"`);
    }

}
