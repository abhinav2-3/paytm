import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const seedData = async () => {
  const Rohit = await prisma.user.upsert({
    where: {
      number: "9999999999",
    },
    update: {},
    create: {
      number: "9999999999",
      password: "rohit1",
      name: "Rohit",
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "120",
          provider: "HDFC Bank",
        },
      },
    },
  });
  const Abhinav = await prisma.user.upsert({
    where: {
      number: "7052314766",
    },
    update: {},
    create: {
      number: "7052314766",
      password: "abhii",
      name: "Abhinav",
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 200000,
          token: "122",
          provider: "HDFC Bank",
        },
      },
    },
  });
  const Jordan = await prisma.user.upsert({
    where: {
      number: "1112223330",
    },
    update: {},
    create: {
      number: "1112223330",
      password: "jordan",
      name: "Jordan",
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "123",
          provider: "HDFC Bank",
        },
      },
    },
  });
  console.log(Rohit, Abhinav, Jordan);
};
seedData()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
