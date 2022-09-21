import { NotFoundException } from "@nestjs/common";
import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { Study } from "src/graphql-types/study.type";
import { DeleteResult } from "typeorm";
import { CreateStudentInput } from "./create-student.input";
import { StudentService } from "./student.service";
import { StudentType } from "./student.type";


@Resolver(of => StudentType)
export class StudentResolver {

    constructor(
        private studentService: StudentService
    ) { }

    @Query(returns => StudentType)
    student(
        @Args('id') id: string
    ) {
        return this.studentService.getStudent(id);
    }

    @Query(returns => [StudentType])
    students() {
        return this.studentService.getAllStudents();
    }

    @Mutation(returns => StudentType)
    createStudent(
        @Args('createStudentInput') createStudentInput: CreateStudentInput
    ) {
        return this.studentService.createStudent(createStudentInput);
    }

    // Delete student
    @Mutation(returns => Boolean)
    async deleteStudent(
        @Args('id') id: string
    ) {
        const val = await this.studentService.deleteStudent(id);

        // if student not found
        if (val.affected === 0) {
            throw new NotFoundException('Student not found');
        }

        return true;
    }

    @Query(returns => Study)
    getStudy() {
        return 'Hi';
    }
}