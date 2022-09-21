import { Field, InputType } from "@nestjs/graphql";
import { IsEnum, MinLength } from "class-validator";
import { Status } from "src/enum/status.enum";


@InputType()
export class CreateStudentInput {


    @MinLength(1)
    @Field()
    firstName: string;

    @MinLength(1)
    @Field()
    lastName: string;

    // @MinLength(1)
    // @Field()
    // status: string;

    @IsEnum(Status)
    @Field()
    status: Status;
}