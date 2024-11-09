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

// Add feedback content templates
const feedbackTemplates = [
  {
    content: "The system was down again today",
    sentiment: "Negative",
    issueType: "downtime",
  },
  {
    content: "Love the new dashboard features",
    sentiment: "Positive",
    issueType: "features",
  },
  {
    content: "Payment processing is still problematic",
    sentiment: "Negative",
    issueType: "payment",
  },
  {
    content: "Customer support was very helpful",
    sentiment: "Positive",
    issueType: "support",
  },
  {
    content: "The platform could use more advanced trading tools",
    sentiment: "Neutral",
    issueType: "features",
  },
  {
    content: "Had trouble resetting my password",
    sentiment: "Negative",
    issueType: "access",
  },
  {
    content: "Integration with my tools works great",
    sentiment: "Positive",
    issueType: "integration",
  },
];

// Generate more users (total 20)
const generateMoreUsers = () => {
  const tradingStyles = [
    "day trading",
    "swing trading",
    "position trading",
    "scalping",
    "algorithmic trading",
  ];
  const expertiseLevels = [
    "beginner",
    "intermediate",
    "expert",
    "professional",
  ];
  const regions = [
    "North America",
    "Europe",
    "Asia",
    "South America",
    "Africa",
    "Oceania",
  ];
  const contacts = ["email", "phone", "chat", "social media"];
  const actions = [
    "Feature request",
    "Bug report",
    "Support ticket",
    "Tutorial completed",
    "Settings updated",
  ];

  const additionalUsers = Array.from({ length: 17 }, () => ({
    age: Math.floor(Math.random() * (65 - 18) + 18),
    tradingStyle:
      tradingStyles[Math.floor(Math.random() * tradingStyles.length)],
    expertiseLevel:
      expertiseLevels[Math.floor(Math.random() * expertiseLevels.length)],
    region: regions[Math.floor(Math.random() * regions.length)],
    preferredContact: contacts[Math.floor(Math.random() * contacts.length)],
    platformUsage: Number((Math.random() * 8 + 1).toFixed(1)),
    npsScore: Math.floor(Math.random() * 11),
    csatScore: Math.floor(Math.random() * 6),
    cesScore: Math.floor(Math.random() * 6),
    recentlyReportedIssue: Math.random() > 0.7,
    feedbackFrequency: Math.floor(Math.random() * 10),
    accountAge: Math.floor(Math.random() * 36),
    lastAction: actions[Math.floor(Math.random() * actions.length)],
    deltaNps: Number((Math.random() * 2 - 1).toFixed(1)),
    deltaCsat: Number((Math.random() * 2 - 1).toFixed(1)),
    deltaCes: Number((Math.random() * 2 - 1).toFixed(1)),
    simulationDate: new Date(
      Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
    ),
    lastFeedbackDate: new Date(
      Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
    ),
  }));

  return [...users, ...additionalUsers];
};

async function main() {
  console.log("Start seeding...");

  // Clear existing data
  await prisma.feedback.deleteMany();
  await prisma.issue.deleteMany();
  await prisma.user.deleteMany();

  // Insert issues
  const createdIssues = await Promise.all(
    issues.map((issue) => prisma.issue.create({ data: issue }))
  );

  // Insert users
  const allUsers = generateMoreUsers();
  const createdUsers = await Promise.all(
    allUsers.map((user) => prisma.user.create({ data: user }))
  );

  // Generate and insert feedback
  const feedbackData = Array.from({ length: 50 }, () => {
    const user = createdUsers[Math.floor(Math.random() * createdUsers.length)];
    const issue =
      Math.random() > 0.3
        ? createdIssues[Math.floor(Math.random() * createdIssues.length)]
        : null;
    const template =
      feedbackTemplates[Math.floor(Math.random() * feedbackTemplates.length)];

    return {
      userId: user.id,
      content: template.content,
      sentiment: template.sentiment,
      issueId: issue?.id || null,
      createdAt: new Date(
        Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
      ),
    };
  });

  await Promise.all(
    feedbackData.map((feedback) => prisma.feedback.create({ data: feedback }))
  );

  console.log(`Created ${createdIssues.length} issues`);
  console.log(`Created ${createdUsers.length} users`);
  console.log(`Created ${feedbackData.length} feedback entries`);
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
