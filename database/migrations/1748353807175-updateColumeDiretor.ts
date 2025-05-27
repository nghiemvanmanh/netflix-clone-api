import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateColumeDiretor1748353807175 implements MigrationInterface {
    name = 'UpdateColumeDiretor1748353807175'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "directors" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "photoUrl" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a9ae28f00c93801aa034a2c1773" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movies_directors_directors" ("moviesId" integer NOT NULL, "directorsId" integer NOT NULL, CONSTRAINT "PK_abe694a3e79d5c643a32e522497" PRIMARY KEY ("moviesId", "directorsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_668ef403881ed50222bd69d60c" ON "movies_directors_directors" ("moviesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_bec316d1f8c152edabafd5ad4e" ON "movies_directors_directors" ("directorsId") `);
        await queryRunner.query(`ALTER TABLE "movies_directors_directors" ADD CONSTRAINT "FK_668ef403881ed50222bd69d60c9" FOREIGN KEY ("moviesId") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movies_directors_directors" ADD CONSTRAINT "FK_bec316d1f8c152edabafd5ad4e2" FOREIGN KEY ("directorsId") REFERENCES "directors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies_directors_directors" DROP CONSTRAINT "FK_bec316d1f8c152edabafd5ad4e2"`);
        await queryRunner.query(`ALTER TABLE "movies_directors_directors" DROP CONSTRAINT "FK_668ef403881ed50222bd69d60c9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bec316d1f8c152edabafd5ad4e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_668ef403881ed50222bd69d60c"`);
        await queryRunner.query(`DROP TABLE "movies_directors_directors"`);
        await queryRunner.query(`DROP TABLE "directors"`);
    }

}
