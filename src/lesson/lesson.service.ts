import { CreateLessonInput } from './lesson.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>
    ) {}

    async getLessons(): Promise<Lesson[]> {
        return this.lessonRepository.find()
    }

    async getLesson(id: string): Promise<Lesson> {
        return this.lessonRepository.findOneBy({id})
    }

    async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
        const { name, startDate, endDate, students } = createLessonInput
        const lesson = this.lessonRepository.create({
            id: uuid(),
            name,
            startDate,
            endDate,
            students
        })
        return this.lessonRepository.save(lesson)

    }

    async assignStudentsToLesson(lessonId: string, studentIds: string[]): Promise<Lesson> {
        const lesson = await this.lessonRepository.findOneBy({ id: lessonId})
        lesson.students = [...lesson.students, ...studentIds]
        return this.lessonRepository.save(lesson)
    }
}
