import { DataSource } from "typeorm"
import dotenv from "dotenv"
dotenv.config()

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST as string,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  // database: "test",
})

try {
  await AppDataSource.initialize()
  console.log("Data Source has been initialized!")
} catch (error) {
  console.error("Error during Data Source initialization", error)
}