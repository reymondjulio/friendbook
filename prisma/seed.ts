import { PrismaClient } from "@prisma/client";
import dataUsersJSON from "./users.json";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.user.createMany({
    data: dataUsersJSON,
  });
  await prisma.post.deleteMany();
  await prisma.post.create({
    data: { text: "Halo teman-teman", user: { connect: { username: "reymond" } } },
  });
  await prisma.post.create({
    data: { text: "Ayo belajar", user: { connect: { username: "haidar" } } },
  });
}

main()
  .then(async () => {
    console.log("Seeding complete");
    await prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    console.log("Seeding failed");
    prisma.$disconnect();
    process.exit(1);
  });
