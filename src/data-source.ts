import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config(); 

class AppDataSource {
  private static instance: DataSource;

  private constructor() { //construtor privado impede que a classe AppDataSource seja instanciada diretamente de fora da própria classe
  }

  public static getInstance(): DataSource {
    if (!AppDataSource.instance) {
      AppDataSource.instance = new DataSource({
        type: "postgres",
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT) || 5432,
        username: process.env.DB_USER || "postgres",
        password: process.env.DB_PASS || "postgres",
        database: process.env.DB_NAME || "mistérios",
        synchronize: true,
        logging: false,
        entities: ["src/entities/*.ts"],
        migrations: ["src/migrations/*.ts"],
        subscribers: [],
      });
    }
    return AppDataSource.instance;
  }
}

export default AppDataSource;
