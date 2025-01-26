import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity('users')
export class Users {
  @ObjectIdColumn() 
  _id: ObjectId;

  @Column({ unique: true })
  id:string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: new Date() })
  created_at: Date;
  
  @Column({ default: new Date() })
  updated_at: Date;

  @Column({ default: true })
  is_active: boolean;
}
