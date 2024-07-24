import type { Knex } from 'knex';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config({ path: '../../envs/.db.env' });

const configService = new ConfigService();
const knexConfig: Knex.Config = {
  client: 'postgresql',
  connection: {
    host: configService.get('POSTGRES_HOST'),
    port: configService.get('POSTGRES_PORT'),
    user: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DB'),
  },
};

module.exports = knexConfig;

// pnpm dlx knex migrate:make add_some_name
// pnpm dlx knex migrate:latest
