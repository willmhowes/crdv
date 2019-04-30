-- CREATE DATABASE "CRDV"

CREATE TABLE "user" (
  "id" serial PRIMARY KEY,
  "username" varchar UNIQUE,
  "password" varchar
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
  "state_ref" varchar,
  "school_name" varchar,
  "NCES_school_id" bigint UNIQUE,
  "LEA_ref" bigint
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

CREATE TABLE "Discipline of Students with Disabilities" (
  "id" serial PRIMARY KEY,
  "school_id" bigint,
  "Year" integer,
  "Category" varchar,
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

CREATE TABLE "Took SAT or ACT" (
  "id" serial PRIMARY KEY,
  "school_id" bigint,
  "Year" integer,
  "Category" varchar,
  "Sex" varchar,
  "American Indian or Alaska Native" integer,
  "Asian" integer,
  "Hawaiian/ Pacific Islander" integer,
  "Hispanic" integer,
  "Black" integer,
  "White" integer,
  "Two or more races" integer,
  "Total" integer,
  "SWD (IDEA_Eligible)" varchar,
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

ALTER TABLE "Discipline of Students with Disabilities" ADD FOREIGN KEY ("school_id") REFERENCES "school" ("NCES_school_id");

ALTER TABLE "Took SAT or ACT" ADD FOREIGN KEY ("school_id") REFERENCES "school" ("NCES_school_id");
