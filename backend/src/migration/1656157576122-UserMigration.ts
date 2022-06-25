import { MigrationInterface, QueryRunner } from "typeorm"

export class UserMigration1656157576122 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user"(
            id string PRIMARY KEY,
            name string NOT NULL,
            age number,
            email string NOT NULL,
            created TIMESTAMP DEFAULT (datetime(CURRENT_TIMESTAMP,'localtime')))
            `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
