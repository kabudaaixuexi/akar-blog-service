import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from 'src/_entity/news.entity';
import { Forum } from 'src/_entity/forum.entity';

@Injectable()
export class SocketService {
    constructor(
        @InjectRepository(News)
        private newsRepository: any,

        @InjectRepository(Forum)
        private forumRepository: any,
    ) {}

    // NewssaveOne(payload):Promise<News[]> {
    //     return this.newsRepository.save(payload);
    // }

    // 我发出给某人和某人发给我的
    NewsfindByUid(uid, to): Promise<any> {
        return this.newsRepository.find({ where: [{ formUserId: uid, sid: to }, { formUserId: to, sid: uid }] });
    }

    // 我发出的和发给我的 全部
    NewsfindBySelf(uid):Promise<any> {
        return this.newsRepository.find({ where: [{ formUserId: uid }, { sid: uid }] });
    }

    NewsfindAll(): Promise<News[]> {
        return this.newsRepository.find();
    }

    ForumfindById(payload):Promise<News[]> {
        return this.forumRepository.find({ where: [{ forumId: payload.forumId }] });
    }

    ForumUpdateOne(payload):Promise<News[]> {
        return this.forumRepository.update(payload.id, payload);
    }

    ForumDeleteOne(payload):Promise<News[]> {
        return this.forumRepository.delete({ forumId: payload.forumId });
    }

    ForumfindAll(): Promise<News[]> {
        return this.forumRepository.find();
    }
}
