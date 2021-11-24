import {MigrationInterface, QueryRunner} from "typeorm";

export class Entities1637674717877 implements MigrationInterface {
    name = 'Entities1637674717877'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "specie" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "label" character varying(50) NOT NULL, CONSTRAINT "PK_ae8a78cf6f1cffa5f4cfa7d58f4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "animal" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "birthday" TIMESTAMP NOT NULL, "vaccinated" boolean NOT NULL DEFAULT false, "trackingId" character varying(50), "type" character varying NOT NULL, "specieId" uuid NOT NULL, "ownerId" uuid, CONSTRAINT "PK_af42b1374c042fb3fa2251f9f42" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1ce8064319ac591e3b23e02ff9" ON "animal" ("type") `);
        await queryRunner.query(`CREATE TABLE "owner" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" character varying(100) NOT NULL, "addressStreet" character varying(50) NOT NULL, "addressCity" character varying(50) NOT NULL, "addressCountry" character varying(50) NOT NULL, "addressZipcode" character varying(10) NOT NULL, CONSTRAINT "PK_8e86b6b9f94aece7d12d465dc0c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "animal" ADD CONSTRAINT "FK_b8071c13cac34b84a7f0a5279c0" FOREIGN KEY ("specieId") REFERENCES "specie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "animal" ADD CONSTRAINT "FK_be6dbc476b09e04416a7c854d52" FOREIGN KEY ("ownerId") REFERENCES "owner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "animal" DROP CONSTRAINT "FK_be6dbc476b09e04416a7c854d52"`);
        await queryRunner.query(`ALTER TABLE "animal" DROP CONSTRAINT "FK_b8071c13cac34b84a7f0a5279c0"`);
        await queryRunner.query(`DROP TABLE "owner"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1ce8064319ac591e3b23e02ff9"`);
        await queryRunner.query(`DROP TABLE "animal"`);
        await queryRunner.query(`DROP TABLE "specie"`);
    }

}
