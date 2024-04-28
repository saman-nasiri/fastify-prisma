import { FastifyReply, FastifyRequest } from "fastify";
import { CreateCategoryInput } from "./category.schema";
import { createCategory, getCategorys, updateCategoryCounter } from "./category.service";

export async function createCategoryHandler(
  request: FastifyRequest<{
    Body: CreateCategoryInput;
  }>
) {
  const category = await createCategory({
    ...request.body,
    ownerId: request.user.id,
  });

  return category;
}

export async function getCategorysHandler() {
  const categorys = await getCategorys();

  return categorys;
}



export async function updateCategoryCounterHandler(
  request: FastifyRequest<{
    Params: { categoryId: string };
    Body: { amount: number; type: 'inc' | 'dec' };
  }>,
  reply: FastifyReply
) {
  
  try {
    const categoryId = parseInt(request.params.categoryId);
    const { amount, type } = request.body;
    
    if (isNaN(categoryId) || typeof amount !== 'number' || !['inc', 'dec'].includes(type)) {
      throw new Error("Invalid parameters");
    }
    console.log("Update", request.body);
    const updatedCategory = await updateCategoryCounter(categoryId, amount, type);
    console.log("Update", request.body);
    return updatedCategory;
  } catch (error) {
    reply.status(500).send({ error: "Internal Server Error" });
  }
}