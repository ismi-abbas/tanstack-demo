import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql', // "mysql" | "sqlite" | "postgresql"
  schema: './src/db/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: 'postgresql://test_owner:xqWUgP3AN5cD@ep-flat-tooth-a1x8d0kk.ap-southeast-1.aws.neon.tech/tanstack-demo?sslmode=require',
  },
});
