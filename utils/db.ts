import { createPool } from 'mysql2/promise';
import { config } from '../config';

export const pool = createPool({
  host: config.dbhost,
  user: config.user,
  database: config.database,
  namedPlaceholders: true,
  decimalNumbers: true,
});
