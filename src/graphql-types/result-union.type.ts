import { createUnionType } from "@nestjs/graphql";
import { LessonType } from "src/lesson/lesson.type";
import { StudentType } from "src/student/student.type";


export const ResultUnion = createUnionType({
    name: 'ResultUnion',
    types: () => [StudentType, LessonType] as const,
    resolveType(value) {
        console.log('From GraphQl');

        console.log(value);

        if (value.StudentType) {
            return 'Student';
        }
        if (value.LessonType) {
            return 'Lesson';
        }
    }
});