/// <reference types="node" />

declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PORT: string;
    DATABASE_URL: string;
    SECRET_KEY: string;
    LOG_FORMAT: string;
    LOG_DIR: string;
    ORIGIN: string;
  }
}
