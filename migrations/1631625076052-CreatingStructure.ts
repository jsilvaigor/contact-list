import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatingStructure1631625076052 implements MigrationInterface {
    name = 'CreatingStructure1631625076052'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("user_uuid" SERIAL NOT NULL, "email" character varying NOT NULL, "password_hashed" character varying NOT NULL, CONSTRAINT "PK_5832c6d9b84363dc2525015d46c" PRIMARY KEY ("user_uuid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
