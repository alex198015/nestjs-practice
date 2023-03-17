import { Task } from './task.entity';
import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>
  ) {
    super(taskRepository.target, taskRepository.manager, taskRepository.queryRunner);
  }

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto
    const query = this.createQueryBuilder('task')
    query.where({ user })

    if(status) {
      query.andWhere('task.status = :status', { status })
    }

    if(search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%`}
      )
    }

    const tasks = await query.getMany()

    return tasks
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const {title, description } = createTaskDto

    const task: Task = this.create({
        title,
        description,
        status: TaskStatus.OPEN,
        user
    })

   await this.save(task)

   return task
  }

}