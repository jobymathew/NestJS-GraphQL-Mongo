import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Status } from "src/enum/status.enum";


@ObjectType('Student')
export class StudentType {

    @Field(type => ID)
    id: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    // @Field()
    // status: string;

    @Field(type => Status)
    status: Status;

}