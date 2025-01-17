import { knex as setupKnex, Knex } from "knex"
import { env } from "./env"

if (!process.env.DATABASE_URL) {
  throw new Error("Database not found.")
}

export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection: {
    filename: env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./db/migrations",
  },
}

export const knex = setupKnex(config)
