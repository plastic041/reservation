import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const price = () => Number(faker.commerce.price(1000, 100000, 0));

const main = async () => {
  await prisma.shop.upsert({
    where: { id: 0 },
    update: {},
    create: {
      id: 0,
      name: faker.company.name(),
    },
  });

  await prisma.shop.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: faker.company.name(),
    },
  });

  await prisma.menu.upsert({
    where: { id: 0 },
    update: {},
    create: {
      id: 0,
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: price(),
      shopId: 0,
    },
  });

  await prisma.menu.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: price(),
      shopId: 0,
    },
  });

  await prisma.menuOption.upsert({
    where: { id: 0 },
    update: {},
    create: {
      id: 0,
      name: faker.commerce.productName(),
      price: price(),
      menuId: 0,
    },
  });

  await prisma.menuOption.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: faker.commerce.productName(),
      price: price(),
      menuId: 0,
    },
  });

  await prisma.menuOption.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: faker.commerce.productName(),
      price: price(),
      menuId: 0,
    },
  });
};

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect);
