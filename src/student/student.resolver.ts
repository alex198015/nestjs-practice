import { CreateStudentInput } from './student.input';
import { StudentService } from './student.service';
import { StudentType } from './student.type';
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

@Resolver(of => StudentType)
export class StudentResolver {
    constructor(
        private studentServics: StudentService
    ) {}

    @Mutation(returns => StudentType) 
    async createStudent(
            @Args('createStudentInput') createStudentInput: CreateStudentInput
        ) {
            return this.studentServics.createStudent(createStudentInput)
        }

    @Query(returns => [StudentType])
    async students() {
        return this.studentServics.getStudents()
    }

    @Query(returns => StudentType)
    async student(
        @Args('id') id: string
    ) {
        return this.studentServics.getStudent(id)
    }
    
}