import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('orders')
export class Orders {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  user: ObjectId;

  @Column()
  truck: ObjectId;

  @Column()
  status: string;

  @Column()
  pickup: ObjectId;

  @Column()
  dropoff: ObjectId;
}
