import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('news')
export class News {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  formUid: string;

  @Column()
  formUserId: string;

  @Column()
  groupId: string;

  @Column()
  message: string;

  @Column()
  msgType: string;

  @Column()
  sendTime: string;

  @Column()
  needFeedBack: string;

  @Column()
  sid: string;
}
