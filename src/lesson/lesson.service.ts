import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './lesson.input';
import { AssignStudentsToLessonInput } from './assign-students-to-lesson.input';

@Injectable()
export class LessonService {

    constructor(
        @InjectRepository(Lesson) private lessonRepsitory: Repository<Lesson>,
    ) { }

    async getLesson(id: string): Promise<Lesson> {
        return this.lessonRepsitory.findOneBy({ id });
    }

    async getAllLessons(): Promise<Lesson[]> {
        // all users
        return this.lessonRepsitory.find();
    }

    async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
        const { name, startDate, endDate, students } = createLessonInput;
        const lesson = this.lessonRepsitory.create({
            id: uuid(),
            name,
            startDate,
            endDate,
            students,
        });

        return this.lessonRepsitory.save(lesson);
    }

    async assignStudentsToLesson(assignStudentsToLessonInput: AssignStudentsToLessonInput): Promise<Lesson> {
        const { lessonId, studentIds } = assignStudentsToLessonInput;
        // finding the lesson
        const lesson = await this.lessonRepsitory.findOneBy({ id: lessonId });

        // spreading out already existing students and the new ones
        lesson.students = [...lesson.students, ...studentIds];

        return this.lessonRepsitory.save(lesson);

    }
}
