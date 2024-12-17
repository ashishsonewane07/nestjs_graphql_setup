import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // Generate GraphQL schema
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',          // PostgreSQL host
      port: 5432,                 // PostgreSQL default port
      username: 'postgres',   // Replace with your PostgreSQL username
      password: 'root', // Replace with your PostgreSQL password
      database: 'Study_mode_db',   // Replace with your database name
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Auto-load entities
      synchronize: true,          // Auto-sync schema (disable in production)
      logging: true,              // Enable query logging
    }),
    ProductModule,
  ],
})
export class AppModule {}
