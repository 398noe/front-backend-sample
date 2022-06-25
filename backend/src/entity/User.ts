import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryColumn({nullable: false})
        readonly id?: string;

    @Column({length: 20, nullable: false})
        private name?: string;

    @Column({nullable: false})
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