import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from 'src/_entity/news.entity';

@Injectable()
export class SocketService {
    constructor(
        @InjectRepository(News)
        private newsRepository: any,
    ) {}

    saveOne(payload):Promise<News[]> {
        return this.newsRepository.save(payload);
    }

    // 我发出给某人和某人发给我的
    findByUid(uid, to): Promise<any> {
        return this.newsRepository.find({ where: [{ formUserId: uid, sid: to }, { formUserId: to, sid: uid }] });
    }

    // 我发出的和发给我的 全部
    findBySelf(uid):Promise<any> {
        return this.newsRepository.find({ where: [{ formUserId: uid }, { sid: uid }] });
    }

    findAll(): Promise<News[]> {
        return this.newsRepository.find();
    }
}
