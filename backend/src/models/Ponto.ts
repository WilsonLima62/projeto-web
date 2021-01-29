import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm'

import Image from './Image'

@Entity('pontos')
export default class Pontos {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    name: string

    @Column()
    latitude: number

    @Column()
    longitude: number
    
    @Column()
    about: string

    @Column()
    instructions: string

    @Column()
    opening_hours: string

    @Column()
    open_on_weekends: boolean

    @OneToMany(() => Image, image => image.ponto, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'ponto_id' })
    images: Image[]
}