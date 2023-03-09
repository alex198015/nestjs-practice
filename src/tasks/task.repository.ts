import { Task } from './task.entity';
import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>
  ) {
    super(taskRepository.target, taskRepository.manager, taskRepository.queryRunner);
  }

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto
    const query = this.createQueryBuilder('task')

    if(status) {
      query.andWhere('task.status = :status', { status })
    }

    if(search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%`}
      )
    }

    const tasks = await query.getMany()

    return tasks
  }


}