import { FastifyInstance } from "fastify"
import { randomUUID } from "node:crypto"
import { z } from "zod"
import { knex } from "../database"

export async function mealsRoutes(app: FastifyInstance) {
  app.post("/", async (request, reply) => {
    const createMealBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      isOnDiet: z.boolean(),
      date: z.coerce.date(),
    })

    const { date, description, isOnDiet, name } = createMealBodySchema.parse(
      request.body
    )

    console.log({
      date,
      description,
      isOnDiet,
      name,
    })

    await knex("meals").insert({
      id: randomUUID(),
      name,
      description,
      is_on_diet: isOnDiet,
      date: date.getDate(),
      user_id: "d5f57a34-03cc-4164-8134-3b111e1138d8",
    })

    return reply.status(201).send()
  })
}
