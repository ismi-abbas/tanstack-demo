import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon(
  'postgresql://test_owner:xqWUgP3AN5cD@ep-flat-tooth-a1x8d0kk.ap-southeast-1.aws.neon.tech/tanstack-demo?sslmode=require'
);
export const db = drizzle(sql);
