import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
  await knex.raw(`
    CREATE TYPE roles AS ENUM (
      'admin',
      'user',
      'worker'
    );
  `);
  await knex.raw(`
    CREATE TABLE users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      role roles NOT NULL DEFAULT 'user',
      email VARCHAR(255) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      phone_number VARCHAR(30) UNIQUE,
      nickname VARCHAR(50) UNIQUE,
      first_name VARCHAR(255),
      last_name VARCHAR(255),
      birthdate DATE,
      image TEXT,
      date_of_registration TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw('DROP TABLE IF EXISTS users;');
  // Удаляем тип ENUM
  await knex.raw(`DROP TYPE IF EXISTS roles;`);
}
