import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('trucks')
export class Trucks {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  user: ObjectId;

  @Column()
  year: string;

  @Column()
  color: string;

  @Column()
  plates: string;
}
