import { Resolver, Query, Mutation, Args, ResolveField, Parent, Directive } from "@nestjs/graphql";
import { AssignStudentsToLessonInput } from "./assign-students-to-lesson.input";
import { CreateLessonInput } from "./lesson.input";
import { LessonService } from "./lesson.service";
import { LessonType } from "./lesson.type";
import { Lesson } from '../lesson/lesson.entity';
import { StudentService } from "src/student/student.service";
import { ResultUnion } from "src/graphql-types/result-union.type";
import { StudentType } from "src/student/student.type";


@Resolver(of => LessonType)
export class LessonResolver {

    constructor(
        private lessonService: LessonService,
        private studentService: StudentService,
    ) { }

    // query
    @Directive('@deprecated(reason: "This query will be removed in the next version")')
    @Query(returns => LessonType)
    lesson(
        @Args('id') id: string,
    ) {
        return this.lessonService.getLesson(id);
    }

    @Query(returns => [LessonType])
    lessons() {
        return this.lessonService.getAllLessons();
    }

    // Mutation to create
    @Mutation(returns => LessonType)
    createLesson(
        // @Args('name') name: string,
        // @Args('startDate') startDate: string,
        // @Args('endDate') endDate: string,
        @Args('createLessonInput') createLessonInput: CreateLessonInput,
    ) {
        return this.lessonService.createLesson(createLessonInput);
    }

    @Mutation(returns => LessonType)
    assignStudentsToLesson(
        @Args('assignStudentsToLessonInput') assignStudentsToLessonInput: AssignStudentsToLessonInput
    ) {
        return this.lessonService.assignStudentsToLesson(assignStudentsToLessonInput);
    }

    // resolving students
    @ResolveField('students')
    async students(@Parent() lesson: Lesson) {
        console.log(lesson);
        return this.studentService.getManyStudents(lesson.students);
    }

    @Query(returns => [ResultUnion])
    search(): Array<typeof ResultUnion> {
        return [new StudentType(), new LessonType()];
    }


}