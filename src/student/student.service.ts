import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateStudentInput } from './create-student.input';
import { Student } from './student.entity';
import { v4 as uuid } from 'uuid';
import { UpdateStudentInput } from './update-student.input';

@Injectable()
export class StudentService {

    constructor(
        @InjectRepository(Student) private studentRepository: Repository<Student>
    ) { }

    async getStudent(id: string): Promise<Student> {
        const found = await this.studentRepository.findOneBy({ id });

        if (!found) {
            throw new NotFoundException(`Task with ID ${id} not found`);
            // throw new BadRequestException(`Task with ID ${id} not found`);
        }

        return found;
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

    // update student
    async updateStudent(id: string, updateStudentInput: UpdateStudentInput): Promise<Student> {
        const student = await this.getStudent(id);

        if (updateStudentInput.firstName) {
            student.firstName = updateStudentInput.firstName;
        }

        if (updateStudentInput.lastName) {
            student.lastName = updateStudentInput.lastName;
        }

        if (updateStudentInput.status) {
            student.status = updateStudentInput.status;
        }

        this.studentRepository.save(student);

        return student;




    }


}
