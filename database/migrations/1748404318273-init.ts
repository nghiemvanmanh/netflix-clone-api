import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1748404318273 implements MigrationInterface {
    name = 'Init1748404318273'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "genres" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_80ecd718f0f00dde5d77a9be842" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reviews" ("id" SERIAL NOT NULL, "content" text NOT NULL, "rating" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "movieId" integer, CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "actors" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "photoUrl" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d8608598c2c4f907a78de2ae461" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "watch_histories" ("id" SERIAL NOT NULL, "watchedAt" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "movieId" integer, CONSTRAINT "PK_75c28b21aacb1bd69e894100d25" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "directors" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "photoUrl" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a9ae28f00c93801aa034a2c1773" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "episodes" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "videoUrl" character varying NOT NULL, "duration" character varying NOT NULL, "episodeNumber" integer NOT NULL, "seasonId" integer, CONSTRAINT "PK_6a003fda8b0473fffc39cb831c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "seasons" ("id" SERIAL NOT NULL, "seasonNumber" integer NOT NULL, "movieId" integer, CONSTRAINT "PK_cb8ed53b5fe109dcd4a4449ec9d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."subtitles_type_enum" AS ENUM('Subtitle', 'Audio')`);
        await queryRunner.query(`CREATE TABLE "subtitles" ("id" SERIAL NOT NULL, "language" character varying NOT NULL, "url" character varying NOT NULL, "type" "public"."subtitles_type_enum" NOT NULL DEFAULT 'Subtitle', "movieId" integer, CONSTRAINT "PK_9ac397e12396227e34ba97af99e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movie-types" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0d5c79e98bbc0d18c97ab047442" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movies" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "thumbnailUrl" character varying NOT NULL, "videoUrl" character varying NOT NULL, "duration" character varying NOT NULL, "releaseDate" date NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorites" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "movieId" integer, CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subscription_plans" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" numeric NOT NULL, "videoQuality" character varying NOT NULL, "maxDevices" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9ab8fe6918451ab3d0a4fb6bb0c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payments" ("id" SERIAL NOT NULL, "amount" numeric NOT NULL, "paymentMethod" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "planId" integer, CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profiles" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "avatarUrl" character varying, "isKids" boolean NOT NULL DEFAULT false, "userId" integer, CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notifications" ("id" SERIAL NOT NULL, "message" character varying NOT NULL, "isRead" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "planId" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh_tokens" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "expiresAt" TIMESTAMP NOT NULL, "userId" integer, CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movies_genres" ("moviesId" integer NOT NULL, "genresId" integer NOT NULL, CONSTRAINT "PK_a5d3ebb8cdde7f76f199db8d1c9" PRIMARY KEY ("moviesId", "genresId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_490f84585d33963d5d7bdc34ec" ON "movies_genres" ("moviesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_91d9e376de22a2324b93d6eae6" ON "movies_genres" ("genresId") `);
        await queryRunner.query(`CREATE TABLE "movies_movie-types" ("moviesId" integer NOT NULL, "movieTypesId" integer NOT NULL, CONSTRAINT "PK_7ff65bdcf039654a05c3d295722" PRIMARY KEY ("moviesId", "movieTypesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_308b66f208ba35af622801eab3" ON "movies_movie-types" ("moviesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_754c0a1a503026c2d6fdef9322" ON "movies_movie-types" ("movieTypesId") `);
        await queryRunner.query(`CREATE TABLE "movies_actors" ("moviesId" integer NOT NULL, "actorsId" integer NOT NULL, CONSTRAINT "PK_737702849f658093632f35b622d" PRIMARY KEY ("moviesId", "actorsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d8b1b832dc2097cddfd6e9ef32" ON "movies_actors" ("moviesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7e36ac9a9ca0e920c39c4c7f45" ON "movies_actors" ("actorsId") `);
        await queryRunner.query(`CREATE TABLE "movies_directors" ("moviesId" integer NOT NULL, "directorsId" integer NOT NULL, CONSTRAINT "PK_14a163157fb4d6d686be7adc6cc" PRIMARY KEY ("moviesId", "directorsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d0db4ae347a31eb25e97efb257" ON "movies_directors" ("moviesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_049c4553f88a6c5ac9ac7fbdb4" ON "movies_directors" ("directorsId") `);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_e50936dfdefcaf083d446baca11" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "watch_histories" ADD CONSTRAINT "FK_0d3c1acce88c08e1de10bd482ad" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "watch_histories" ADD CONSTRAINT "FK_f93283cf708e734d6d6de075cda" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "episodes" ADD CONSTRAINT "FK_b312e9d94c9b80adee2330b73e9" FOREIGN KEY ("seasonId") REFERENCES "seasons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "seasons" ADD CONSTRAINT "FK_93a53de045cdf9a52faf5cb56c9" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subtitles" ADD CONSTRAINT "FK_2b1f17b204961f7b4f3b50a0d04" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD CONSTRAINT "FK_e747534006c6e3c2f09939da60f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD CONSTRAINT "FK_8168e6e1b1583d0b7f6219f920c" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_d35cb3c13a18e1ea1705b2817b1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_a5fabcc0fe0fb93d88cbfbf52fc" FOREIGN KEY ("planId") REFERENCES "subscription_plans"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_315ecd98bd1a42dcf2ec4e2e985" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_692a909ee0fa9383e7859f9b406" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_56f2aa669ddbe83eab8a25898b2" FOREIGN KEY ("planId") REFERENCES "subscription_plans"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_610102b60fea1455310ccd299de" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movies_genres" ADD CONSTRAINT "FK_490f84585d33963d5d7bdc34ec6" FOREIGN KEY ("moviesId") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movies_genres" ADD CONSTRAINT "FK_91d9e376de22a2324b93d6eae62" FOREIGN KEY ("genresId") REFERENCES "genres"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movies_movie-types" ADD CONSTRAINT "FK_308b66f208ba35af622801eab3a" FOREIGN KEY ("moviesId") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movies_movie-types" ADD CONSTRAINT "FK_754c0a1a503026c2d6fdef9322b" FOREIGN KEY ("movieTypesId") REFERENCES "movie-types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movies_actors" ADD CONSTRAINT "FK_d8b1b832dc2097cddfd6e9ef324" FOREIGN KEY ("moviesId") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movies_actors" ADD CONSTRAINT "FK_7e36ac9a9ca0e920c39c4c7f454" FOREIGN KEY ("actorsId") REFERENCES "actors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movies_directors" ADD CONSTRAINT "FK_d0db4ae347a31eb25e97efb257b" FOREIGN KEY ("moviesId") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movies_directors" ADD CONSTRAINT "FK_049c4553f88a6c5ac9ac7fbdb42" FOREIGN KEY ("directorsId") REFERENCES "directors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies_directors" DROP CONSTRAINT "FK_049c4553f88a6c5ac9ac7fbdb42"`);
        await queryRunner.query(`ALTER TABLE "movies_directors" DROP CONSTRAINT "FK_d0db4ae347a31eb25e97efb257b"`);
        await queryRunner.query(`ALTER TABLE "movies_actors" DROP CONSTRAINT "FK_7e36ac9a9ca0e920c39c4c7f454"`);
        await queryRunner.query(`ALTER TABLE "movies_actors" DROP CONSTRAINT "FK_d8b1b832dc2097cddfd6e9ef324"`);
        await queryRunner.query(`ALTER TABLE "movies_movie-types" DROP CONSTRAINT "FK_754c0a1a503026c2d6fdef9322b"`);
        await queryRunner.query(`ALTER TABLE "movies_movie-types" DROP CONSTRAINT "FK_308b66f208ba35af622801eab3a"`);
        await queryRunner.query(`ALTER TABLE "movies_genres" DROP CONSTRAINT "FK_91d9e376de22a2324b93d6eae62"`);
        await queryRunner.query(`ALTER TABLE "movies_genres" DROP CONSTRAINT "FK_490f84585d33963d5d7bdc34ec6"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_610102b60fea1455310ccd299de"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_56f2aa669ddbe83eab8a25898b2"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_692a909ee0fa9383e7859f9b406"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_315ecd98bd1a42dcf2ec4e2e985"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_a5fabcc0fe0fb93d88cbfbf52fc"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_d35cb3c13a18e1ea1705b2817b1"`);
        await queryRunner.query(`ALTER TABLE "favorites" DROP CONSTRAINT "FK_8168e6e1b1583d0b7f6219f920c"`);
        await queryRunner.query(`ALTER TABLE "favorites" DROP CONSTRAINT "FK_e747534006c6e3c2f09939da60f"`);
        await queryRunner.query(`ALTER TABLE "subtitles" DROP CONSTRAINT "FK_2b1f17b204961f7b4f3b50a0d04"`);
        await queryRunner.query(`ALTER TABLE "seasons" DROP CONSTRAINT "FK_93a53de045cdf9a52faf5cb56c9"`);
        await queryRunner.query(`ALTER TABLE "episodes" DROP CONSTRAINT "FK_b312e9d94c9b80adee2330b73e9"`);
        await queryRunner.query(`ALTER TABLE "watch_histories" DROP CONSTRAINT "FK_f93283cf708e734d6d6de075cda"`);
        await queryRunner.query(`ALTER TABLE "watch_histories" DROP CONSTRAINT "FK_0d3c1acce88c08e1de10bd482ad"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_e50936dfdefcaf083d446baca11"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_049c4553f88a6c5ac9ac7fbdb4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d0db4ae347a31eb25e97efb257"`);
        await queryRunner.query(`DROP TABLE "movies_directors"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7e36ac9a9ca0e920c39c4c7f45"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d8b1b832dc2097cddfd6e9ef32"`);
        await queryRunner.query(`DROP TABLE "movies_actors"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_754c0a1a503026c2d6fdef9322"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_308b66f208ba35af622801eab3"`);
        await queryRunner.query(`DROP TABLE "movies_movie-types"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_91d9e376de22a2324b93d6eae6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_490f84585d33963d5d7bdc34ec"`);
        await queryRunner.query(`DROP TABLE "movies_genres"`);
        await queryRunner.query(`DROP TABLE "refresh_tokens"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "notifications"`);
        await queryRunner.query(`DROP TABLE "profiles"`);
        await queryRunner.query(`DROP TABLE "payments"`);
        await queryRunner.query(`DROP TABLE "subscription_plans"`);
        await queryRunner.query(`DROP TABLE "favorites"`);
        await queryRunner.query(`DROP TABLE "movies"`);
        await queryRunner.query(`DROP TABLE "movie-types"`);
        await queryRunner.query(`DROP TABLE "subtitles"`);
        await queryRunner.query(`DROP TYPE "public"."subtitles_type_enum"`);
        await queryRunner.query(`DROP TABLE "seasons"`);
        await queryRunner.query(`DROP TABLE "episodes"`);
        await queryRunner.query(`DROP TABLE "directors"`);
        await queryRunner.query(`DROP TABLE "watch_histories"`);
        await queryRunner.query(`DROP TABLE "actors"`);
        await queryRunner.query(`DROP TABLE "reviews"`);
        await queryRunner.query(`DROP TABLE "genres"`);
    }

}
