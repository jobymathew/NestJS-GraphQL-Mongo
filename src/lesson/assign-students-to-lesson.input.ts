import { Field, InputType, ID } from "@nestjs/graphql";
import { IsUUID } from "class-validator";


@InputType()
export class AssignStudentsToLessonInput {

    // For array of ids
    @IsUUID("4", { each: true })
    @Field(type => [ID])
    studentIds: string[];

    @IsUUID()
    @Field(type => ID)
    lessonId: string;


}