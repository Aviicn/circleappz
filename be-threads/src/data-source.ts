import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5000,
  username: "postgres",
  password: "0909",
  database: "be_threads",
  synchronize: false,
  logging: false,
  entities: ["src/entities/*.ts"],
  migrations: ["src/migration/*.ts"],
  subscribers: [],
});
