import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: "postgres",
        host: process.env.DB_HOST ?? "localhost",
        port: Number(process.env.DB_PORT) ?? 5432,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
      });

      return dataSource.initialize();
    },
  },
];