DROP TABLE IF EXISTS "insurances_professionals";
DROP TABLE IF EXISTS "insurances_users";
DROP TABLE IF EXISTS "specialties_professionals";
DROP TABLE IF EXISTS "availabilities_professionals";
DROP TABLE IF EXISTS "appointments";
DROP TABLE IF EXISTS "additionals";
DROP TABLE IF EXISTS "unavailabilities";
DROP TABLE IF EXISTS "users";
DROP TABLE IF EXISTS "professionals";
DROP TABLE IF EXISTS "stablishments";
DROP TABLE IF EXISTS "availabilities_days";
DROP TABLE IF EXISTS "availabilities";
DROP TABLE IF EXISTS "insurances";
DROP TABLE IF EXISTS "specialties";
DROP TABLE IF EXISTS "days";

CREATE TABLE IF NOT EXISTS "insurances" (
    "insurance_id"  INTEGER PRIMARY KEY,
    "name"  TEXT NOT NULL UNIQUE,
    "created_at"  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "specialties" (
    "specialty_id"  INTEGER PRIMARY KEY,
    "name"  TEXT NOT NULL UNIQUE,
    "created_at"  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "days" (
    "day_id"  INTEGER PRIMARY KEY,
    "name"  TEXT NOT NULL UNIQUE,
    "created_at"  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "stablishments" (
    "stablishment_id"  INTEGER PRIMARY KEY,
    "name"  TEXT NOT NULL,
    "address"  TEXT NOT NULL,
    "created_at"  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "users" (
    "user_id"  INTEGER PRIMARY KEY,
    "avatar_url"  TEXT,
    "email"  TEXT NOT NULL UNIQUE,
    "first_name"  TEXT NOT NULL,
    "last_name"  TEXT NOT NULL,
    "password"  TEXT NOT NULL,
    "birthday"  DATE,
    "phone"  TEXT,
    "location"  TEXT,
    "address"  TEXT,
    "created_at"  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "additionals" (
    "additional_id"  INTEGER PRIMARY KEY,
    "first_name"  TEXT NOT NULL,
    "last_name"  TEXT NOT NULL,
    "age"  INTEGER NOT NULL,
    "id" INTEGER NOT NULL,
    "user_id"  INTEGER NOT NULL,
    "created_at"  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY("user_id") REFERENCES "users"("user_id")
);

CREATE TABLE IF NOT EXISTS "professionals" (
    "professional_id"  INTEGER PRIMARY KEY,
    "avatar_url"  TEXT UNIQUE,
    "email"  TEXT NOT NULL UNIQUE,
    "first_name"  TEXT NOT NULL,
    "last_name"  TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "password"  TEXT NOT NULL,
    "age"  INTEGER,
    "id" INTEGER,
    "admin"  BOOLEAN DEFAULT False,
	"stablishment_id"	INTEGER NOT NULL,
    "created_at"  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY("stablishment_id") REFERENCES "stablishments"("stablishment_id")
);

CREATE TABLE IF NOT EXISTS "availabilities" (
    "availability_id"  INTEGER PRIMARY KEY,
    "duration"  INTEGER NOT NULL,
    "start_at"  INTEGER NOT NULL, 
    "end_at"  INTEGER NOT NULL, 
    "created_at"  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "unavailabilities" (
    "unavailability_id"  INTEGER PRIMARY KEY,
    "start"  DATE NOT NULL, 
	"end" DATE NOT NULL,
    "professional_id"  INTEGER NOT NULL,
    "created_at"  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY("professional_id") REFERENCES "professionals"("professional_id")
);

CREATE TABLE IF NOT EXISTS "appointments" (
    "appointment_id"  INTEGER PRIMARY KEY,
    "datetime"  TIMESTAMP NOT NULL UNIQUE,
    "confirmation"  TEXT DEFAULT 'Waiting',
    "rating"  INTEGER,
    "review"  TEXT,
    "user_id"  INTEGER,
    "additional_id"  INTEGER,
    "professional_id"  INTEGER NOT NULL,
    "created_at"  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CHECK(confirmation IN ('Approved', 'Denied', 'Waiting')),
    FOREIGN KEY("professional_id") REFERENCES "professionals"("professional_id"),
    FOREIGN KEY("user_id") REFERENCES "users"("user_id"),
    FOREIGN KEY("additional_id") REFERENCES "additionals"("additional_id")
);

CREATE TABLE IF NOT EXISTS "insurances_professionals" (
    "relationship_id"  INTEGER PRIMARY KEY,
    "insurance_id"  INTEGER NOT NULL,
    "professional_id"  INTEGER NOT NULL,
    FOREIGN KEY("insurance_id") REFERENCES "insurances"("insurance_id"),
    FOREIGN KEY("professional_id") REFERENCES "professionals"("professional_id")
);

CREATE TABLE IF NOT EXISTS "insurances_users" (
    "relationship_id"  INTEGER PRIMARY KEY,
    "insurance_id"  INTEGER NOT NULL,
    "user_id"  INTEGER NOT NULL,
    FOREIGN KEY("insurance_id") REFERENCES "insurances"("insurance_id"),
    FOREIGN KEY("user_id") REFERENCES "users"("user_id")
);

CREATE TABLE IF NOT EXISTS "specialties_professionals" (
    "relationship_id"  INTEGER PRIMARY KEY,
    "specialty_id"  INTEGER NOT NULL,
    "professional_id"  INTEGER NOT NULL,
    FOREIGN KEY("specialty_id") REFERENCES "specialties"("specialty_id"),
    FOREIGN KEY("professional_id") REFERENCES "professionals"("professional_id")
);

CREATE TABLE IF NOT EXISTS "availabilities_days" (
    "relationship_id"  INTEGER PRIMARY KEY,
    "availability_id"  INTEGER NOT NULL,
    "day_id"  INTEGER NOT NULL,
    FOREIGN KEY("availability_id") REFERENCES "availabilities"("availability_id"),
    FOREIGN KEY("day_id") REFERENCES "days"("day_id")
);

CREATE TABLE IF NOT EXISTS "availabilities_professionals" (
	"relationship_id"	INTEGER PRIMARY KEY,
	"availability_id"	INTEGER NOT NULL,
	"professional_id"	INTEGER NOT NULL,
	FOREIGN KEY("availability_id") REFERENCES "availabilities"("availability_id"),
	FOREIGN KEY("professional_id") REFERENCES "professionals"("professional_id")
);