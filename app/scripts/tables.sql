CREATE TABLE "health_insurances" (
  "insurance_id" INTEGER PRIMARY KEY,
  "name" TEXT UNIQUE NOT NULL,
  "created_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "specialties" (
  "specialty_id" INTEGER PRIMARY KEY,
  "name" TEXT UNIQUE NOT NULL,
  "created_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "stablishments" (
  "stablishment_id" INTEGER PRIMARY KEY,
  "name" TEXT NOT NULL,
  "city" TEXT NOT NULL,
  "street" TEXT NOT NULL,
  "zip_code" TEXT NOT NULL,
  "image_url" TEXT NOT NULL,
  "color_schema" TEXT NOT NULL,
  "created_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "accounts" (
  "account_id" INTEGER PRIMARY KEY,
  "email" TEXT UNIQUE NOT NULL,
  "first_name" TEXT NOT NULL,
  "last_name" TEXT NOT NULL,
  "hashed_password" TEXT NOT NULL,
  "identity_number" INT,
  "avatar_url" TEXT,
  "birthday" DATE,
  "phone" TEXT,
  "city" TEXT,
  "address" TEXT,
  "created_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  "updated_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "additionals" (
  "additional_id" INTEGER PRIMARY KEY,
  "first_name" TEXT NOT NULL,
  "last_name" TEXT NOT NULL,
  "age" INTEGER NOT NULL,
  "identity_number" INTEGER NOT NULL,
  "account_id" INTEGER NOT NULL,
  "created_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "professionals" (
  "professional_id" INTEGER PRIMARY KEY,
  "admin" BOOLEAN DEFAULT false,
  "stablishment_id" INTEGER NOT NULL,
  "account_id" INTEGER NOT NULL,
  "created_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  "updated_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "availabilities" (
  "availability_id" INTEGER PRIMARY KEY,
  "day_of_week" ENUM(monday,tuesday,wednesday,thursday,friday,saturday,sunday) NOT NULL,
  "slot_duration" ENUM(30,45,60) NOT NULL,
  "recurrence_period" ENUM(1,3,6) NOT NULL,
  "professional_id" INTEGER NOT NULL,
  "created_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  "updated_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "time_slots" (
  "time_slot_id" INTEGER PRIMARY KEY,
  "start_time" TIME NOT NULL,
  "end_time" TIME NOT NULL,
  "availability_id" INTEGER NOT NULL,
  "created_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  "updated_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "appointments" (
  "appointment_id" INTEGER PRIMARY KEY,
  "date" DATE NOT NULL,
  "time" TIME NOT NULL,
  "status" ENUM(pending,approved,denied,completed,cancelled) DEFAULT 'Pending',
  "account_id" INTEGER NOT NULL,
  "additional_id" INTEGER,
  "professional_id" INTEGER NOT NULL,
  "created_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  "updated_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "review" (
  "review_id" INTEGER PRIMARY KEY,
  "rating" INTEGER NOT NULL,
  "review" TEXT NOT NULL,
  "appointment_id" INTEGER NOT NULL,
  "created_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  "updated_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "health_insurances_accounts" (
  "relationship_id" INTEGER PRIMARY KEY,
  "insurance_id" INTEGER NOT NULL,
  "account_id" INTEGER NOT NULL,
  "created_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "specialties_professionals" (
  "relationship_id" INTEGER PRIMARY KEY,
  "specialty_id" INTEGER NOT NULL,
  "professional_id" INTEGER NOT NULL,
  "created_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

ALTER TABLE "additionals" ADD FOREIGN KEY ("account_id") REFERENCES "accounts" ("account_id");

ALTER TABLE "professionals" ADD FOREIGN KEY ("stablishment_id") REFERENCES "stablishments" ("stablishment_id");

ALTER TABLE "appointments" ADD FOREIGN KEY ("professional_id") REFERENCES "professionals" ("professional_id");

ALTER TABLE "appointments" ADD FOREIGN KEY ("account_id") REFERENCES "accounts" ("account_id");

ALTER TABLE "appointments" ADD FOREIGN KEY ("additional_id") REFERENCES "additionals" ("additional_id");

ALTER TABLE "review" ADD FOREIGN KEY ("appointment_id") REFERENCES "appointments" ("appointment_id");

ALTER TABLE "health_insurances_accounts" ADD FOREIGN KEY ("insurance_id") REFERENCES "health_insurances" ("insurance_id");

ALTER TABLE "health_insurances_accounts" ADD FOREIGN KEY ("account_id") REFERENCES "accounts" ("account_id");

ALTER TABLE "specialties_professionals" ADD FOREIGN KEY ("specialty_id") REFERENCES "specialties" ("specialty_id");

ALTER TABLE "specialties_professionals" ADD FOREIGN KEY ("professional_id") REFERENCES "professionals" ("professional_id");

ALTER TABLE "professionals" ADD FOREIGN KEY ("account_id") REFERENCES "accounts" ("account_id");

ALTER TABLE "availabilities" ADD FOREIGN KEY ("professional_id") REFERENCES "professionals" ("professional_id");

ALTER TABLE "time_slots" ADD FOREIGN KEY ("availability_id") REFERENCES "availabilities" ("availability_id");
