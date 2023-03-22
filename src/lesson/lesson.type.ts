import { StudentType } from '../student/student.type';
import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType('Lesson')
export class LessonType {
    @Field(type => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    startDate: string;

    @Field()
    endDate: string;

    @Field(type => [StudentType])
    students: string[];
}