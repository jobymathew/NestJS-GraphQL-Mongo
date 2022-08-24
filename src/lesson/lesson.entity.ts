import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";


@Entity()
export class Lesson {

    // mongo expects a _id by default this is the mongodbid
    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    startDate: string;

    @Column()
    endDate: string;

    @Column()
    students: string[];
}