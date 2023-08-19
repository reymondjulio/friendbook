import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.user.createMany({
    data: [
      {
        name: "Reymond Julio",
        username: "reymond",
        avatarURL: "/images/avatars/reymond.jpg",
        coverURL: "/images/cover/reymond-cover.jpg",
      },
      {
        name: "M Haidar Hanif",
        username: "haidar",
        avatarURL: "/images/avatars/haidar.jpg",
        coverURL: "/images/cover/haidar-cover.jpg",
      },
      {
        name: "Caroline Elizabeth",
        username: "caroline",
        avatarURL: "/images/avatars/caroline.jpg",
        coverURL: "/images/cover/caroline-cover.jpg",
      },
    ],
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
