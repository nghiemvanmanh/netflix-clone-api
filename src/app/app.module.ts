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
import { MyListsModule } from 'src/my-lists/my-lists.module';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { SubscriptionsModule } from 'src/subscriptions/subscriptions.module';
import { mailerProvider } from 'src/mailer/mailer.providers';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: (() => {
        return process.env.NODE_ENV === 'production'
          ? '.env.production'
          : '.env';
      })(),
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // CHỈ cần import ConfigModule, KHÔNG gọi forRoot ở đây
      inject: [ConfigService],
      useFactory: () => dataSource.options,
    }),

    UsersModule,
    AuthModule,
    ProfilesModule,
    ActorsModule,
    DirectorsModule,
    MoviesModule,
    GenresModule,
    MovieTypesModule,
    MyListsModule,
    NotificationsModule,
    SubscriptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService, mailerProvider],
  exports: [mailerProvider],
})
export class AppModule {}
