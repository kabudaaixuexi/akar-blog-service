import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
  WebSocketServer,
} from "@nestjs/websockets";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { News } from "src/_entity/news.entity";
import { Forum } from "src/_entity/forum.entity";
import { SocketService } from "./socket.service";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Socket, Server } from "socket.io";
import { Logger } from "@nestjs/common";

@WebSocketGateway(18099, { cors: true })
export class SocketGateway implements OnGatewayInit {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,

    @InjectRepository(Forum)
    private readonly forumRepository: Repository<Forum>
  ) {}

  @WebSocketServer() wss: Server;
  private logger: Logger = new Logger("usersRepository");

  afterInit(server: any) {
    this.logger.log("usersRepository");
  }

  // 加入房间 news-聊天表 / notices-通告表 / forum-沸点表
  @SubscribeMessage("joinRoom")
  joinRoom(client: Socket, name: string) {
    client.join(name);
    this.wss.to(name).emit("joinRoomSuccess", `加入${name}成功`);
    client.on(name, (payload) => {
      this.wss.to(name).emit(name, payload);
      name === "news" && this.newsRepository.save(payload);
      (name === "forum" && payload) && this.forumRepository.save(payload);
    });
  }
}
