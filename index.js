const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const allAuthors = await prisma.author.findMany();
  console.log(allAuthors);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
