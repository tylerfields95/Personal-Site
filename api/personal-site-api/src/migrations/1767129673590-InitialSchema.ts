import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1767129673590 implements MigrationInterface {
    name = 'InitialSchema1767129673590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "media" ("id" SERIAL NOT NULL, "filename" character varying NOT NULL, "data" bytea NOT NULL, "fileType" character varying NOT NULL, "size" integer NOT NULL, "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blog_images" ("id" SERIAL NOT NULL, "imageName" character varying, "position" integer, "mediaId" integer, "blogBodyId" integer, CONSTRAINT "PK_6d0e82081d480edf74e548575f4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blog_bodies" ("id" SERIAL NOT NULL, "header" character varying, "subHeader" character varying, "body" text, "blogContentId" integer, CONSTRAINT "PK_58c9ef8e5a0620998a165ef3060" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blog_contents" ("id" SERIAL NOT NULL, "header" character varying NOT NULL, "subHeader" character varying NOT NULL, "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "lastModifiedOn" TIMESTAMP NOT NULL DEFAULT now(), "author" character varying NOT NULL, CONSTRAINT "PK_24fa1a325ef3ece85f077a360f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "blog_images" ADD CONSTRAINT "FK_72b9427594445a03d8eab89f266" FOREIGN KEY ("mediaId") REFERENCES "media"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blog_images" ADD CONSTRAINT "FK_ab9821b8f537c3529c796c34c74" FOREIGN KEY ("blogBodyId") REFERENCES "blog_bodies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blog_bodies" ADD CONSTRAINT "FK_fd1c3f36dcdc73462f8a3f0047e" FOREIGN KEY ("blogContentId") REFERENCES "blog_contents"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog_bodies" DROP CONSTRAINT "FK_fd1c3f36dcdc73462f8a3f0047e"`);
        await queryRunner.query(`ALTER TABLE "blog_images" DROP CONSTRAINT "FK_ab9821b8f537c3529c796c34c74"`);
        await queryRunner.query(`ALTER TABLE "blog_images" DROP CONSTRAINT "FK_72b9427594445a03d8eab89f266"`);
        await queryRunner.query(`DROP TABLE "blog_contents"`);
        await queryRunner.query(`DROP TABLE "blog_bodies"`);
        await queryRunner.query(`DROP TABLE "blog_images"`);
        await queryRunner.query(`DROP TABLE "media"`);
    }

}
