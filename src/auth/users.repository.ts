import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm'
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
    super(userRepository.target, userRepository.manager, userRepository.queryRunner);
  }
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt )
    
    const user = this.create({ username, password: hashedPassword })

    try {

      await this.save(user)
    } catch(error) {
      if(error.code === '23505') {
        throw new ConflictException('Username already exists')
      } else {
        throw new InternalServerErrorException()
      }
    }
  }

}