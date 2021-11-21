import {MigrationInterface, QueryRunner} from "typeorm";

export class Entities1637591074852 implements MigrationInterface {
    name = 'Entities1637591074852'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "species" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "label" character varying(50) NOT NULL, CONSTRAINT "PK_ae6a87f2423ba6c25dc43c32770" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "animal" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "birthday" TIMESTAMP NOT NULL, "vaccinated" boolean NOT NULL DEFAULT false, "type" character varying NOT NULL, "speciesId" uuid NOT NULL, CONSTRAINT "PK_af42b1374c042fb3fa2251f9f42" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1ce8064319ac591e3b23e02ff9" ON "animal" ("type") `);
        await queryRunner.query(`CREATE TABLE "owner" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" character varying(100) NOT NULL, "addressStreet" character varying(50) NOT NULL, "addressCity" character varying(50) NOT NULL, "addressCountry" character varying(50) NOT NULL, "addressZipcode" character varying(10) NOT NULL, CONSTRAINT "PK_8e86b6b9f94aece7d12d465dc0c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "birthday" TIMESTAMP NOT NULL, "vaccinated" boolean NOT NULL DEFAULT false, "speciesId" uuid NOT NULL, "ownerId" uuid, CONSTRAINT "PK_b1ac2e88e89b9480e0c5b53fa60" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wild_animal" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "birthday" TIMESTAMP NOT NULL, "vaccinated" boolean NOT NULL DEFAULT false, "trackingId" character varying(50), "speciesId" uuid NOT NULL, CONSTRAINT "PK_d0da1d41159dc405b1d8501fd57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "animal" ADD CONSTRAINT "FK_3ea91e9bbecafc1d0093ee48e89" FOREIGN KEY ("speciesId") REFERENCES "species"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pet" ADD CONSTRAINT "FK_d5b9ba337297b043bd8b264c554" FOREIGN KEY ("speciesId") REFERENCES "species"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pet" ADD CONSTRAINT "FK_20acc45f799c122ec3735a3b8b1" FOREIGN KEY ("ownerId") REFERENCES "owner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wild_animal" ADD CONSTRAINT "FK_61c9d706807c0b25f06e8327e2a" FOREIGN KEY ("speciesId") REFERENCES "species"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wild_animal" DROP CONSTRAINT "FK_61c9d706807c0b25f06e8327e2a"`);
        await queryRunner.query(`ALTER TABLE "pet" DROP CONSTRAINT "FK_20acc45f799c122ec3735a3b8b1"`);
        await queryRunner.query(`ALTER TABLE "pet" DROP CONSTRAINT "FK_d5b9ba337297b043bd8b264c554"`);
        await queryRunner.query(`ALTER TABLE "animal" DROP CONSTRAINT "FK_3ea91e9bbecafc1d0093ee48e89"`);
        await queryRunner.query(`DROP TABLE "wild_animal"`);
        await queryRunner.query(`DROP TABLE "pet"`);
        await queryRunner.query(`DROP TABLE "owner"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1ce8064319ac591e3b23e02ff9"`);
        await queryRunner.query(`DROP TABLE "animal"`);
        await queryRunner.query(`DROP TABLE "species"`);
    }

}
