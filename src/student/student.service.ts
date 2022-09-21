import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateStudentInput } from './create-student.input';
import { Student } from './student.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {

    constructor(
        @InjectRepository(Student) private studentRepository: Repository<Student>
    ) { }

    async getStudent(id: string): Promise<Student> {
        return this.studentRepository.findOneBy({ id });
    }

    async getAllStudents(): Promise<Student[]> {
        return this.studentRepository.find();
    }

    async createStudent(createStudentInput: CreateStudentInput): Promise<Student> {
        const { firstName, lastName, status } = createStudentInput;
        const student = this.studentRepository.create({
            id: uuid(),
            firstName,
            lastName,
            status,
        });

        return this.studentRepository.save(student);
    }

    async getManyStudents(studentIds: string[]): Promise<Student[]> {
        const ans = this.studentRepository.find({
            where: {
                id: {
                    $in: [studentIds],
                } as any
            }
        });
        console.log('Ans');

        console.log(ans);

        return ans;
    }

    async deleteStudent(id: string): Promise<DeleteResult> {

        return this.studentRepository.delete({ id });
        // return true;
    }


}
