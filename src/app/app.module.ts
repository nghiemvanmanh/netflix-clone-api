import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { dataSource } from 'typeorm.config';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { ActorsModule } from 'src/actors/actors.module';
import { DirectorsModule } from 'src/directors/directors.module';
import { MoviesModule } from 'src/movies/movies.module';
import { GenresModule } from 'src/genres/genres.module';
import { MovieTypesModule } from 'src/movie-types/movie-types.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: () => dataSource.options,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    ProfilesModule,
    ActorsModule,
    DirectorsModule,
    MoviesModule,
    GenresModule,
    MovieTypesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
