import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(
    `
    CREATE EXTENSION IF NOT EXISTS pg_trgm;
    `,
  );
  await knex.raw(`
    CREATE TYPE product_category AS ENUM (
      'headphones',
      'smartphones',
      'notebooks',
      'tablets',
      'pc',
      'monitors'
    );
  `);

  await knex.raw(`
    CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      manufacturer VARCHAR(100) NOT NULL,
      category product_category NOT NULL,
      name VARCHAR(100) NOT NULL,
      model VARCHAR(100) NOT NULL,
      article VARCHAR(100) NOT NULL UNIQUE,
      price DECIMAL(10, 2) NOT NULL,
      warranty INT,
      release_year INT NOT NULL,
      count INT DEFAULT 0,
      discount DECIMAL(5, 2) DEFAULT 0.00,
      title_img TEXT,
      images TEXT[],
      reviewNum INT DEFAULT 0,
      date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      color VARCHAR(100),
      camera VARCHAR(100),
      sim_count INT,
      memory INT,
      ram INT,
      battery_life INT,
      matrix VARCHAR(100),
      screen_width_px INT,
      screen_height_px INT,
      diagonal_inch INT,
      display_hertz INT,
      processor VARCHAR(100),
      cores INT,
      weight INT,
      length INT
    );
  `);
}

export async function down(knex: Knex): Promise<void> {
  // Удаляем таблицу products
  await knex.raw(`DROP TABLE IF EXISTS products;`);

  // Удаляем тип ENUM
  await knex.raw(`DROP TYPE IF EXISTS product_category;`);
}
