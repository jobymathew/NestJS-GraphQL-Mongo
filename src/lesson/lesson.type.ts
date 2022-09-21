import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import { StudentType } from "src/student/student.type";


// Name of type in brackets
@ObjectType('Lesson')
export class LessonType {

    // graphql type
    @Field(type => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    startDate: string;

    @Field()
    endDate: string;

    // linking the students into lessons
    @Field(type => [StudentType])
    students: string[];

}