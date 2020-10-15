import {Entity, Column, JoinColumn, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'

import Orphanat from './Orphanate'

@Entity('imagens')
export default class Image{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    patch: string;

    @ManyToOne(()=> Orphanat, orphanage => orphanage.images )
    @JoinColumn({name: 'id_orphanat'})
    orphanage: Orphanat
}