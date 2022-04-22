import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  uid: string;

  @Column()
  userName: string;

  @Column()
  passWord: string;

  @Column()
  nickName: string;

  @Column()
  photo: string;

  @Column()
  role: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  @Column()
  extData: string;

  @Column()
  useNick: string;
}
