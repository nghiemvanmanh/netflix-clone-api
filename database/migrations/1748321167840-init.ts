import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1748321167840 implements MigrationInterface {
    name = 'Init1748321167840'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "genres" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_80ecd718f0f00dde5d77a9be842" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reviews" ("id" SERIAL NOT NULL, "content" text NOT NULL, "rating" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "movieId" integer, CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "actors" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "desceription" character varying NOT NULL, "photoUrl" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d8608598c2c4f907a78de2ae461" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "watch_histories" ("id" SERIAL NOT NULL, "watchedAt" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "movieId" integer, CONSTRAINT "PK_75c28b21aacb1bd69e894100d25" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "director" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "desceription" character varying NOT NULL, "photoUrl" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b85b179882f31c43324ef124fea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "episodes" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "videoUrl" character varying NOT NULL, "duration" character varying NOT NULL, "episodeNumber" integer NOT NULL, "seasonId" integer, CONSTRAINT "PK_6a003fda8b0473fffc39cb831c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "seasons" ("id" SERIAL NOT NULL, "seasonNumber" integer NOT NULL, "movieId" integer, CONSTRAINT "PK_cb8ed53b5fe109dcd4a4449ec9d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."subtitles_type_enum" AS ENUM('Subtitle', 'Audio')`);
        await queryRunner.query(`CREATE TABLE "subtitles" ("id" SERIAL NOT NULL, "language" character varying NOT NULL, "url" character varying NOT NULL, "type" "public"."subtitles_type_enum" NOT NULL DEFAULT 'Subtitle', "movieId" integer, CONSTRAINT "PK_9ac397e12396227e34ba97af99e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movies" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "thumbnailUrl" character varying NOT NULL, "videoUrl" character varying NOT NULL, "duration" character varying NOT NULL, "releaseDate" date NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorites" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "movieId" integer, CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subscription_plans" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" numeric NOT NULL, "videoQuality" character varying NOT NULL, "maxDevices" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9ab8fe6918451ab3d0a4fb6bb0c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payments" ("id" SERIAL NOT NULL, "amount" numeric NOT NULL, "paymentMethod" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "planId" integer, CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profiles" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "avatarUrl" character varying, "isKids" boolean NOT NULL DEFAULT false, "userId" integer, CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notifications" ("id" SERIAL NOT NULL, "message" character varying NOT NULL, "isRead" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "planId" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh_tokens" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "expiresAt" TIMESTAMP NOT NULL, "userId" integer, CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movies_genres_genres" ("moviesId" integer NOT NULL, "genresId" integer NOT NULL, CONSTRAINT "PK_59537f354fd4a79606cc4f3cf1b" PRIMARY KEY ("moviesId", "genresId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cb43556a8849221b82cd17461c" ON "movies_genres_genres" ("moviesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ccf6c10277da37e9fc265863fa" ON "movies_genres_genres" ("genresId") `);
        await queryRunner.query(`CREATE TABLE "movies_actors_actors" ("moviesId" integer NOT NULL, "actorsId" integer NOT NULL, CONSTRAINT "PK_81ffbd4dab2aab2970909e04035" PRIMARY KEY ("moviesId", "actorsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_638b1d6f6929495fa5b87206da" ON "movies_actors_actors" ("moviesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6f9bbef3136f7efc40a5a55886" ON "movies_actors_actors" ("actorsId") `);
        await queryRunner.query(`CREATE TABLE "movies_directors_director" ("moviesId" integer NOT NULL, "directorId" integer NOT NULL, CONSTRAINT "PK_43989b228d7192f735ae7bb6d8f" PRIMARY KEY ("moviesId", "directorId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1e5d80a18836512b862e4d97bd" ON "movies_directors_director" ("moviesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_998050188cfa2f532751b0ab5d" ON "movies_directors_director" ("directorId") `);
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
        await queryRunner.query(`ALTER TABLE "movies_genres_genres" ADD CONSTRAINT "FK_cb43556a8849221b82cd17461c8" FOREIGN KEY ("moviesId") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movies_genres_genres" ADD CONSTRAINT "FK_ccf6c10277da37e9fc265863fab" FOREIGN KEY ("genresId") REFERENCES "genres"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movies_actors_actors" ADD CONSTRAINT "FK_638b1d6f6929495fa5b87206daf" FOREIGN KEY ("moviesId") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movies_actors_actors" ADD CONSTRAINT "FK_6f9bbef3136f7efc40a5a55886c" FOREIGN KEY ("actorsId") REFERENCES "actors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movies_directors_director" ADD CONSTRAINT "FK_1e5d80a18836512b862e4d97bd0" FOREIGN KEY ("moviesId") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movies_directors_director" ADD CONSTRAINT "FK_998050188cfa2f532751b0ab5da" FOREIGN KEY ("directorId") REFERENCES "director"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies_directors_director" DROP CONSTRAINT "FK_998050188cfa2f532751b0ab5da"`);
        await queryRunner.query(`ALTER TABLE "movies_directors_director" DROP CONSTRAINT "FK_1e5d80a18836512b862e4d97bd0"`);
        await queryRunner.query(`ALTER TABLE "movies_actors_actors" DROP CONSTRAINT "FK_6f9bbef3136f7efc40a5a55886c"`);
        await queryRunner.query(`ALTER TABLE "movies_actors_actors" DROP CONSTRAINT "FK_638b1d6f6929495fa5b87206daf"`);
        await queryRunner.query(`ALTER TABLE "movies_genres_genres" DROP CONSTRAINT "FK_ccf6c10277da37e9fc265863fab"`);
        await queryRunner.query(`ALTER TABLE "movies_genres_genres" DROP CONSTRAINT "FK_cb43556a8849221b82cd17461c8"`);
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
        await queryRunner.query(`DROP INDEX "public"."IDX_998050188cfa2f532751b0ab5d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1e5d80a18836512b862e4d97bd"`);
        await queryRunner.query(`DROP TABLE "movies_directors_director"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6f9bbef3136f7efc40a5a55886"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_638b1d6f6929495fa5b87206da"`);
        await queryRunner.query(`DROP TABLE "movies_actors_actors"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ccf6c10277da37e9fc265863fa"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cb43556a8849221b82cd17461c"`);
        await queryRunner.query(`DROP TABLE "movies_genres_genres"`);
        await queryRunner.query(`DROP TABLE "refresh_tokens"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "notifications"`);
        await queryRunner.query(`DROP TABLE "profiles"`);
        await queryRunner.query(`DROP TABLE "payments"`);
        await queryRunner.query(`DROP TABLE "subscription_plans"`);
        await queryRunner.query(`DROP TABLE "favorites"`);
        await queryRunner.query(`DROP TABLE "movies"`);
        await queryRunner.query(`DROP TABLE "subtitles"`);
        await queryRunner.query(`DROP TYPE "public"."subtitles_type_enum"`);
        await queryRunner.query(`DROP TABLE "seasons"`);
        await queryRunner.query(`DROP TABLE "episodes"`);
        await queryRunner.query(`DROP TABLE "director"`);
        await queryRunner.query(`DROP TABLE "watch_histories"`);
        await queryRunner.query(`DROP TABLE "actors"`);
        await queryRunner.query(`DROP TABLE "reviews"`);
        await queryRunner.query(`DROP TABLE "genres"`);
    }

}
