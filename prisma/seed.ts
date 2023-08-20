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
        name: "Christopher Kevin",
        username: "christopher",
        avatarURL: "/images/avatars/christopher.jpg",
        coverURL: "/images/cover/christopher-cover.jpg",
      },
      {
        name: "Caroline Elizabeth",
        username: "caroline",
        avatarURL: "/images/avatars/caroline.jpg",
        coverURL: "/images/cover/caroline-cover.jpg",
      },
      {
        name: "Daniel William",
        username: "daniel",
        avatarURL: "/images/avatars/daniel.jpg",
        coverURL: "/images/cover/daniel-cover.jpg",
      },
      {
        name: "Victoria Grace",
        username: "victoria",
        avatarURL: "/images/avatars/victoria.jpg",
        coverURL: "/images/cover/victoria-cover.jpg",
      },
      {
        name: "Jessica Lynn",
        username: "jessica",
        avatarURL: "/images/avatars/jessica.jpg",
        coverURL: "/images/cover/jessica-cover.jpg",
      },
      {
        name: "Kelly Marie",
        username: "kelly",
        avatarURL: "/images/avatars/kelly.jpg",
        coverURL: "/images/cover/kelly-cover.jpg",
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
