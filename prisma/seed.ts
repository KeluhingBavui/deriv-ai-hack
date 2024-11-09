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

const users = [
  {
    age: 28,
    tradingStyle: "day trading",
    expertiseLevel: "intermediate",
    region: "North America",
    preferredContact: "email",
    platformUsage: 4.5,
    npsScore: 8,
    csatScore: 4,
    cesScore: 2,
    recentlyReportedIssue: false,
    feedbackFrequency: 3,
    accountAge: 12,
    lastAction: "Feature request acknowledged",
    deltaNps: 0.5,
    deltaCsat: 0.3,
    deltaCes: -0.2,
    simulationDate: new Date("2024-03-15"),
    lastFeedbackDate: new Date("2024-03-10"),
  },
  {
    age: 35,
    tradingStyle: "swing trading",
    expertiseLevel: "expert",
    region: "Europe",
    preferredContact: "phone",
    platformUsage: 6.2,
    npsScore: 9,
    csatScore: 5,
    cesScore: 1,
    recentlyReportedIssue: true,
    feedbackFrequency: 5,
    accountAge: 24,
    lastAction: "UI update implemented",
    deltaNps: 1.0,
    deltaCsat: 0.5,
    deltaCes: -0.5,
    simulationDate: new Date("2024-03-14"),
    lastFeedbackDate: new Date("2024-03-12"),
  },
  {
    age: 22,
    tradingStyle: "position trading",
    expertiseLevel: "beginner",
    region: "Asia",
    preferredContact: "email",
    platformUsage: 2.8,
    npsScore: 6,
    csatScore: 3,
    cesScore: 4,
    recentlyReportedIssue: false,
    feedbackFrequency: 1,
    accountAge: 3,
    lastAction: "Tutorial completed",
    deltaNps: 1.5,
    deltaCsat: 0.8,
    deltaCes: -1.0,
    simulationDate: new Date("2024-03-13"),
    lastFeedbackDate: new Date("2024-03-08"),
  },
];

async function main() {
  console.log("Start seeding...");

  // Clear existing data
  await prisma.issue.deleteMany();
  await prisma.user.deleteMany();

  // Insert issues
  for (const issue of issues) {
    const result = await prisma.issue.create({
      data: issue,
    });
    console.log(`Created issue with id: ${result.id}`);
  }

  // Insert users
  for (const user of users) {
    const result = await prisma.user.create({
      data: user,
    });
    console.log(`Created user with id: ${result.id}`);
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
