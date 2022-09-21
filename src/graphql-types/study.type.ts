import { Field, ObjectType } from "@nestjs/graphql";
import { ResultUnion } from "./result-union.type";


@ObjectType('Study')
export class Study {

    @Field(type => ResultUnion)
    task: string[];
}