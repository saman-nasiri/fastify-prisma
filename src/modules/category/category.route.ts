import { FastifyInstance } from "fastify";
import { createCategoryHandler, getCategorysHandler, updateCategoryCounterHandler } from "./category.controller";
import { $ref } from "./category.schema";

async function categoryRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("createCategorySchema"),
        response: {
          201: $ref("categoryResponseSchema"),
        },
      },
    },
    createCategoryHandler
  );

  server.get(
    "/",
    {
      schema: {
        response: {
          200: $ref("categorysResponseSchema"),
        },
      },
    },

    getCategorysHandler
  );



server.put(
  "/:categoryId",
  {
    schema: {
      params: {
        categoryId: { type: "integer" },
      },
      body: {
        type: "object",
        properties: {
          amount: { type: "number" },
          type: { type: "string", enum: ["inc", "dec"] }
        },
        required: ["amount", "type"]
      },
      response: {
        200: { $ref: "categoryResponseSchema" },
      },
    },
  },
  updateCategoryCounterHandler
);
}

export default categoryRoutes;
