import { Entity, ObjectIdColumn, Column, Unique } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('locations')
export class Locations {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    address: string;

    @Column({ unique: true })
    place_id: string;

    @Column('double')
    latitude: number;

    @Column('double')
    longitude: number;
}
