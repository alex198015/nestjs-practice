import { Lesson } from './lesson.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { LessonResover } from './lesson.resolver';
import { LessonService } from './lesson.service';
import { StudentModule } from 'src/student/student.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Lesson]),
        StudentModule
    ],
    providers: [LessonResover, LessonService]
})
export class LessonModule {}
