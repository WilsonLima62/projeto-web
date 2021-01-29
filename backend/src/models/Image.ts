import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import Ponto from './Ponto'

@Entity('images')
export default class Image {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    path: string

    @ManyToOne(() => Ponto, ponto => ponto.images)
    @JoinColumn({ name: 'ponto_id' })
    ponto: Ponto
}