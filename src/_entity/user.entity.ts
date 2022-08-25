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
  userGender: string;

  @Column()
  photo: string;

  @Column()
  userIntro: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  @Column()
  extData: string;

  @Column()
  userEmail: string;

  @Column()
  userPhone: string;

  @Column()
  userRegion: string;

  @Column()
  userOffice: string;

  @Column()
  userBirth: string;

  @Column()
  showExtend: boolean;

  @Column()
  showLinks: boolean;

  @Column()
  userLinks: string;
}