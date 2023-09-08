import { PrismaClient } from "@prisma/client";
import dataUsersJSON from "./users.json";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  // await prisma.user.createMany({
  //   data: dataUsersJSON,
  // });

  const dataUsersWithPassword = dataUsersJSON.map((user) => {
    const hash = bcrypt.hashSync(user.password ?? "", 10);

    const newUser = {
      ...user,
      password: { create: { hash } },
    };

    return newUser;
  });
  // console.log(JSON.stringify(dataUsersWithPassword, null, 2));

  for (const user of dataUsersWithPassword) {
    const createdUser = await prisma.user.create({
      data: user,
    });

    console.info(`✅ User "${createdUser.username}" created`);
  }

  await prisma.post.deleteMany();
  await prisma.post.create({
    data: {
      text: "Halo teman-teman",
      user: { connect: { username: "reymond" } },
    },
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
