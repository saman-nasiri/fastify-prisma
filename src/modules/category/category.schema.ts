import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const categoryInput = {
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  category: z.string().optional(),
  counter: z.number().optional(),
};

const categoryGenerated = {
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
};

const createCategorySchema = z.object({
  ...categoryInput,
});

const categoryResponseSchema = z.object({
  ...categoryInput,
  ...categoryGenerated,
});

const categorysResponseSchema = z.array(categoryResponseSchema);

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;

export const { schemas: categorySchemas, $ref } = buildJsonSchemas({
  createCategorySchema,
  categoryResponseSchema,
  categorysResponseSchema,
});
