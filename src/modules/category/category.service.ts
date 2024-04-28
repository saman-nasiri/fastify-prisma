import prisma from "../../utils/prisma";
import { CreateCategoryInput } from "./category.schema";

export async function createCategory(
  data: CreateCategoryInput & { ownerId: number }
) {
    // Check if the ownerId exists in the User table
    const user = await prisma.user.findUnique({
      where: {
        id: data.ownerId,
      },
    });
  
    if (!user) {
      throw new Error("Owner not found");
    }
    const category = await prisma.category.create({
    data,
  });

  return category;
}

export function getCategorys() {
  return prisma.category.findMany({
    select: {
      latitude: true,
      longitude: true,
      category: true,
      counter: true,
      id: true,
      createdAt: true,
      updatedAt: true,
      owner: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });
}


export async function updateCategoryCounter(categoryId: number, amount: number, type: 'inc' | 'dec') {
  console.log("inc");
  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  let updateCounter: number;
  
  if (type === 'inc') {
    
    updateCounter = category.counter + amount;
  } else if (type === 'dec') {
    updateCounter = category.counter - amount;
  } else {
    throw new Error("Invalid type. Type must be 'inc' or 'dec'.");
  }

  const updatedCategory = await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: {
      counter: updateCounter,
    },
  });

  return updatedCategory;
}

