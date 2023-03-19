import { AuthModule } from './../auth/auth.module';
import { TaskRepository } from './task.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Task]),
    AuthModule
  ],
  controllers: [TasksController],
  providers: [TasksService, TaskRepository],
})
export class TasksModule {}
