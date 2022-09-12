import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { AppController } from './app.controller';

import { AppService } from './app.service';
import { PetsModule } from './pets/pets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { OwnersModule } from './owners/owners.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true
  }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'nestjspostgres',
      entities: ['dist/**/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    PetsModule,
    OwnersModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService, AuthService, JwtService],
})
export class AppModule {
  constructor(private dataSource: DataSource){}
}
