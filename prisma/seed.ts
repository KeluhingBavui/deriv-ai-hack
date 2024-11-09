import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const issues = [
  {
    sentiment: "Positive",
    source: "Trust Pilot",
    description: "Great customer service experience with the support team",
    critical: false,
    team: "Support",
    priority: "Medium",
  },
  {
    sentiment: "Negative",
    source: "Live Chat",
    description: "Payment processing failed multiple times",
    critical: true,
    team: "Finance",
    priority: "High",
  },
  {
    sentiment: "Neutral",
    source: "Trust Pilot",
    description: "Product works as expected but could use more features",
    critical: false,
    team: "Engineering",
    priority: "Low",
  },
  {
    sentiment: "Positive",
    source: "Live Chat",
    description: "New dashboard feature is very intuitive",
    critical: false,
    team: "Engineering",
    priority: "Medium",
  },
  {
    sentiment: "Negative",
    source: "Trust Pilot",
    description: "Unable to access account after password reset",
    critical: true,
    team: "Engineering",
    priority: "High",
  },
  {
    sentiment: "Neutral",
    source: "Live Chat",
    description: "Question about pricing tiers",
    critical: false,
    team: "Finance",
    priority: "Low",
  },
  {
    sentiment: "Positive",
    source: "Trust Pilot",
    description: "Integration with third-party tools works perfectly",
    critical: false,
    team: "Engineering",
    priority: "Medium",
  },
  {
    sentiment: "Negative",
    source: "Live Chat",
    description: "System downtime affecting critical operations",
    critical: true,
    team: "Engineering",
    priority: "High",
  },
];

async function main() {
  console.log("Start seeding...");

  // Clear existing data
  await prisma.issue.deleteMany();

  // Insert new data
  for (const issue of issues) {
    const result = await prisma.issue.create({
      data: issue,
    });
    console.log(`Created issue with id: ${result.id}`);
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
