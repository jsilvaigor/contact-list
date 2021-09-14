import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateStructure1631641077416 implements MigrationInterface {
    name = 'CreateStructure1631641077416'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("user_uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password_hashed" character varying NOT NULL, CONSTRAINT "PK_5832c6d9b84363dc2525015d46c" PRIMARY KEY ("user_uuid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
