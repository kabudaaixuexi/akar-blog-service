import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('forum')
export class Forum {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  forumId: string;

  @Column()
  uid: string;

  @Column()
  userName: string;

  @Column()
  userGender: string;

  @Column()
  userPortrait: string;

  @Column()
  userIntro: string;

  @Column()
  createdAt: string;

  @Column()
  extData: string;

  @Column()
  userRegion: string;

  @Column()
  userOffice: string;
}