import { BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
        readonly id?: string;

    @Column({length: 20, nullable: false})
        private name?: string;

    @Column({length: 3, nullable: false})
        private age?: number;

    @Column({length: 50, nullable: false})
        private email?: string;

    constructor(id: string, name: string, age: number, email:string) {
        super();
        this.id = id;
        this.name = name;
        this.age = age;
        this.email = email;
    }
};