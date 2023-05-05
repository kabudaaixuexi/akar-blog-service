import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('notice')
export class Notice {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  uid: string;

  @Column()
  userName: string;

  @Column()
  userPortrait: string;

  @Column()
  createdAt: string;

  @Column()
  extData: string;
}