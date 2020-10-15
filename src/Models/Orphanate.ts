import {Entity, Column, OneToMany, PrimaryGeneratedColumn, JoinColumn} from 'typeorm'

import Imagens from './Imagens';

@Entity('orphanats')
export default class Orphanat{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    about: string;

    @Column()
    instructions: string;

    @Column()
    opening_hours: string;

    @Column()
    open_day_weekends: boolean;

    @OneToMany(()=> Imagens, image=> image.orphanage, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({name: 'id_orphanat'})
    images: Imagens[];
}