const { PrismaClient, EnumIntervalUnit } = require("@prisma/client");
const prisma = new PrismaClient();

async function applySeed() {
  await prisma.dataset.createMany({
    data: [
      {
        provider: "People Data Labs",
        type: "People",
        recurring: true,
        interval: 1,
        intervalUnit: EnumIntervalUnit.YEAR,
      },
      {
        provider: "People Data Labs",
        type: "Company",
      },
      {
        provider: "Zoominfo",
        type: "People",
      },
      {
        provider: "Apollo",
        type: "People",
      },
      {
        provider: "Apollo",
        type: "Job listing",
      },
    ],
  });
  console.log("Seed data created successfully!");
}

async function resetSeed() {
  await prisma.dataset.deleteMany({});
  console.log("All seed data has been removed successfully!");
}

async function main() {
  const command = process.argv[2];

  if (command === "apply") {
    await applySeed();
  } else if (command === "reset") {
    await resetSeed();
  } else {
    console.log(
      'Invalid command. Use "apply" to seed data or "reset" to remove seeded data.'
    );
    process.exit(1);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
