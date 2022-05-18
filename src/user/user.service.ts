import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { User } from '../_entity/user.entity'

// jwt
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: any,
        
        private readonly jwtService: JwtService,
    ) {}

    saveOne(payload):Promise<User[]> {
        return this.usersRepository.save(payload);
    }

    updateOne(payload):Promise<User[]> {
        return this.usersRepository.update( payload.id, payload);
    }

    // modifyOne(payload):Promise<User[]> {
    //     return this.usersRepository.save(payload);
    // }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findUserName(userName): Promise<any> {
        return this.usersRepository.find({ where: { userName } });
    }

    findId(id): Promise<any> {
        return this.usersRepository.find({ where: { id } });
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }

    createToken(user) {
        const { userName, passWord } = user
        const payload = { userName, passWord };
        return this.jwtService.sign(payload)
    }
}
