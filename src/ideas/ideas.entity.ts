import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('ideas')
export class IdeasEntity {
    @PrimaryGeneratedColumn('uuid') id: string;

    @CreateDateColumn() created: Date;

    @UpdateDateColumn() update: Date;

    @Column('text') idea: string;

    @Column('text') description: string;

    @ManyToOne(type => UserEntity, author => author.ideas)
    author: UserEntity;
}
