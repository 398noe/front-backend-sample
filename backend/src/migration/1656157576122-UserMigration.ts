import { MigrationInterface, QueryRunner } from "typeorm"
import { UserSeed } from "../seed/user.seed";
import { db } from "../data-source";
import { User } from "../entity/User";

export class UserMigration1656157576122 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user"(
            id string PRIMARY KEY,
            name string NOT NULL,
            age number,
            email string NOT NULL,
            created TIMESTAMP DEFAULT (datetime(CURRENT_TIMESTAMP,'localtime')))
        `);
        // Get seed data and insert for initial data
        const userSeed = UserSeed;
        const userRepository = db.getRepository(User);
        userRepository.insert(userSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
