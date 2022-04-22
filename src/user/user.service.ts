import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { User } from '../_entity/user.entity'
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: any
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
}
