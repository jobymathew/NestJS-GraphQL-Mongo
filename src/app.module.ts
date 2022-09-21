import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { Lesson } from './lesson/lesson.entity';
import { LessonModule } from './lesson/lesson.module';
import { Student } from './student/student.entity';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // save the schema in memory and regenerate it 
      // every time we restart the nextjs application -> true
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      playground: false,
      debug: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    LessonModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/school',
      synchronize: true,
      // MongoDB Specific
      useUnifiedTopology: true,
      entities: [
        Lesson,
        Student,
      ],
    }),
    StudentModule
  ],
})
export class AppModule { }
