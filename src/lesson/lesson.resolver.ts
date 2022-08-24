import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { AssignStudentsToLessonInput } from "./assign-students-to-lesson.input";
import { CreateLessonInput } from "./lesson.input";
import { LessonService } from "./lesson.service";
import { LessonType } from "./lesson.type";


@Resolver(of => LessonType)
export class LessonResolver {

    constructor(
        private lessonService: LessonService
    ) { }

    // query
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


}