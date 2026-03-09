import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema',
  datasource: {
    url: process.env.DATABASE_URL || 'postgresql://postgres:2005@localhost:5432/clinic_assist',
  },
});
