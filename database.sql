-- CREATE DATABASE "CRDV"

CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR (80) UNIQUE NOT NULL,
  "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "user_bookmark" (
  "id" serial PRIMARY KEY,
  "user_id" int,
  "state_ref" varchar,
  "LEA_ref" bigint,
  "school_ref" bigint,
  "filter_sql" varchar
);

CREATE TABLE "school" (
  "id" serial PRIMARY KEY,
  "school_name" varchar,
  "NCES_school_id" bigint UNIQUE,
  "LEA_ref" bigint,
  "state_ref" varchar
);

CREATE TABLE "LEA" (
  "id" serial PRIMARY KEY,
  "state_ref" varchar,
  "LEA_name" varchar,
  "NCES_district_id" bigint UNIQUE
);

CREATE TABLE "state" (
  "id" serial PRIMARY KEY,
  "state" varchar UNIQUE,
  "state_name" varchar
);

CREATE TABLE "Discipline of Students without Disabilities" (
  "id" serial PRIMARY KEY,
  "school_id" bigint,
  "Year" integer,
  "Category" varchar,
  "Sex" varchar,
  "Instances" varchar,
  "American Indian or Alaska Native" integer,
  "Asian" integer,
  "Hawaiian/ Pacific Islander" integer,
  "Hispanic" integer,
  "Black" integer,
  "White" integer,
  "Two or more races" integer,
  "Total" integer,
  "LEP" integer
);

ALTER TABLE "user_bookmark" ADD FOREIGN KEY ("school_ref") REFERENCES "school" ("NCES_school_id");

ALTER TABLE "user_bookmark" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "user_bookmark" ADD FOREIGN KEY ("state_ref") REFERENCES "state" ("state");

ALTER TABLE "school" ADD FOREIGN KEY ("state_ref") REFERENCES "state" ("state");

ALTER TABLE "LEA" ADD FOREIGN KEY ("state_ref") REFERENCES "state" ("state");

ALTER TABLE "school" ADD FOREIGN KEY ("LEA_ref") REFERENCES "LEA" ("NCES_district_id");

ALTER TABLE "Discipline of Students without Disabilities" ADD FOREIGN KEY ("school_id") REFERENCES "school" ("NCES_school_id");

ALTER TABLE "user_bookmark" ADD FOREIGN KEY ("LEA_ref") REFERENCES "LEA" ("NCES_district_id");
