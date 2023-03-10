import { JwtPayload } from './jwt-payload.interface';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcrypt'
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}

    async signUp(authCredentials: AuthCredentialsDto): Promise<void> {
        return this.userRepository.createUser(authCredentials)
    }

    async signIn(authCredentials: AuthCredentialsDto): Promise<{accessToken: string}> {
        
        const { username, password } = authCredentials
        const user = await this.userRepository.findOne({ where: {username}})

        if (user && (await bcrypt.compare(password, user.password))) {
            const payload: JwtPayload = { username }
            const accessToken: string = await this.jwtService.sign(payload)

            return { accessToken }
        } else {
            throw new UnauthorizedException('Please check your logging credentials')
        }
        
    }
}
