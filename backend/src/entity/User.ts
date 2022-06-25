import { BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
        readonly id!: number;

    @Column({length: 20, nullable: false})
        private name!: string;

    @Column({length: 3, nullable: false})
        private age!: number;

    @Column({length: 50, nullable: false})
        private email!: string;
};