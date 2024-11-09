import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Creating Users with Feedbacks
  const user1 = await prisma.user.create({
    data: {
      age: 45,
      tradingStyle: "Long-term",
      expertiseLevel: "Advanced",
      region: "North America",
      preferredContact: "Email",
      platformUsage: 0.9,
      npsScore: 9,
      csatScore: 8,
      cesScore: 7,
      recentlyReportedIssue: false,
      feedbackFrequency: 5,
      accountAge: 10,
      lastAction: "Withdrawal",
      deltaNps: 0.1,
      deltaCsat: -0.2,
      deltaCes: 0.0,
      simulationDate: new Date(),
      lastFeedbackDate: new Date(),
      feedbacks: {
        create: [
          {
            content:
              "Best broker in town working with deriv from last 10 years. Best & reliable platform for trading having unique assets like vol crash boom step etc also all other pairs gold btc are also available with very low spread and fee. Also 24 7 support team and live chat support make it more reliable and flexible to work with so far great experience and most recommended broker to trade...",
            sentiment: "Positive",
          },
          {
            content:
              "It's been great trading with deriv. It has all good qualities; the withdrawals system is very good and easy to navigate. I like the tight spreads as it increases the good chances to make profit, even though there's risk. But I am grateful to trade with deriv and am happy with their honesty and integrity.",
            sentiment: "Positive",
          },
          {
            content:
              "Hello Deriv. I really appreciate this product. I buy and sell anytime I want, and I greatly appreciate the security attached to it. Even if a complaint is raised, you thoroughly investigate and make an informed decision. I have never lost money here! This is a very good site.",
            sentiment: "Positive",
          },
        ],
      },
    },
    include: {
      feedbacks: true
    }
  });

  const user2 = await prisma.user.create({
    data: {
      age: 28,
      tradingStyle: "Short-term",
      expertiseLevel: "Intermediate",
      region: "Asia",
      preferredContact: "Phone",
      platformUsage: 0.6,
      npsScore: 3,
      csatScore: 4,
      cesScore: 6,
      recentlyReportedIssue: true,
      feedbackFrequency: 3,
      accountAge: 5,
      lastAction: "Trade",
      deltaNps: -0.5,
      deltaCsat: -0.3,
      deltaCes: -0.1,
      simulationDate: new Date(),
      lastFeedbackDate: new Date(),
      feedbacks: {
        create: [
          {
            content:
              "I'd never trade in their platform again, Deriv X...placed 2 V75s SELL, and then I'm taken out by 2 BUY TRADES that I never placed...to make it worse, they say I gave my credentials to somebody else. I stay alone and nobody knows I'm trading. I've never shared my details with anyone. It was cool, but they're never gonna see my money again because this was not the first time. I reverse any good rating I once gave them even though it was after a similar incident.",
            sentiment: "Negative",
          },
          {
            content:
              "My trading account (Cr3851681) has been unfairly and permanently blocked by Deriv. Their reasoning? 'Excessive deposits and withdrawals.' I have incurred a loss of nearly $1500 USD in the last six months, yet Deriv seems unbothered by the damage done to its customers. Deriv appears to want traders who risk big, lose big, and ultimately boost their profits. It’s absurd and disappointing.",
            sentiment: "Negative",
          },
          {
            content:
              "Deriv is not honest. They manipulate their derived instrument. They cheat very well—you will never make profit with deriv. The house always wins. Scam, thieves...no fair play. If you want to be poor, trade with deriv.",
            sentiment: "Negative",
          },
        ],
      },
    },
    include: {
      feedbacks: true
    }
  });

  const user3 = await prisma.user.create({
    data: {
      age: 42,
      tradingStyle: "Scalping",
      expertiseLevel: "Expert",
      region: "Europe",
      preferredContact: "Email",
      platformUsage: 0.9,
      npsScore: 8,
      csatScore: 7,
      cesScore: 6,
      recentlyReportedIssue: false,
      feedbackFrequency: 2,
      accountAge: 12,
      lastAction: "Deposit",
      deltaNps: 0.2,
      deltaCsat: 0.1,
      deltaCes: -0.2,
      simulationDate: new Date(),
      lastFeedbackDate: new Date(),
      feedbacks: {
        create: [
          {
            content:
              "My cashier is locked. On live chat, I was told it's because I shared payment method with another customer. I didn't share my payment method with anyone. Though I had a past account, which is deleted now, that shared the same payment method with my present account. A ticket has been raised already, and there's no response yet. I will update to 5 stars when my issue is resolved.",
            sentiment: "Neutral",
          },
          {
            content:
              "Hello Deriv, I really appreciate this product. I buy and sell anytime I want, and I greatly appreciate the security attached to it. However, when a complaint is raised, you thoroughly investigate and make an informed decision, although sometimes it feels slow.",
            sentiment: "Neutral",
          },
        ],
      },
    },
    include: {
      feedbacks: true
    }
  });

  const user4 = await prisma.user.create({
    data: {
      age: 30,
      tradingStyle: "Swing",
      expertiseLevel: "Beginner",
      region: "Africa",
      preferredContact: "Chat",
      platformUsage: 0.7,
      npsScore: 5,
      csatScore: 6,
      cesScore: 5,
      recentlyReportedIssue: false,
      feedbackFrequency: 4,
      accountAge: 3,
      lastAction: "Customer Support",
      deltaNps: -0.1,
      deltaCsat: 0.0,
      deltaCes: 0.3,
      simulationDate: new Date(),
      lastFeedbackDate: new Date(),
      feedbacks: {
        create: [
          {
            content:
              "Deriv is great; the transactions are seamless, and they are dependable. Improvements that can be made: remove the delay on entries to make them instant, add candlesticks of durations 5s, 10s, 15s, and 30s, and include Volatility 10 (1s), 25 (1s), 50 (1s), 75 (1s), and 100 (1s) indices in the trading view platform.",
            sentiment: "Neutral",
          },
          {
            content:
              "Execution of trades is easy, and the platform portal is user-friendly. Depositing is easy. NB: Please share trading strategy for your loyalty customers.",
            sentiment: "Positive",
          },
        ],
      },
    },
    include: {
      feedbacks: true
    }
  });

  // Create Issues based on grouped Feedbacks
  await prisma.issue.create({
    data: {
      sentiment: "Positive",
      source: "Customer Feedback",
      description: "Reliability and Trustworthiness of Platform",
      critical: false,
      team: "Customer Success",
      priority: "Medium",
      feedbacks: {
        connect: [
          { id: user1.feedbacks[0].id },
          { id: user1.feedbacks[1].id },
          { id: user1.feedbacks[2].id },
        ],
      },
    },
  });

  await prisma.issue.create({
    data: {
      sentiment: "Negative",
      source: "Customer Feedback",
      description: "Platform Manipulation and Integrity Concerns",
      critical: true,
      team: "Risk and Compliance",
      priority: "High",
      feedbacks: {
        connect: [
          { id: user2.feedbacks[0].id },
          { id: user2.feedbacks[1].id },
          { id: user2.feedbacks[2].id },
        ],
      },
    },
  });

  await prisma.issue.create({
    data: {
      sentiment: "Neutral",
      source: "Customer Feedback",
      description: "Customer Support and Communication Delays",
      critical: false,
      team: "Customer Support",
      priority: "Medium",
      feedbacks: {
        connect: [{ id: user3.feedbacks[0].id }, { id: user3.feedbacks[1].id }],
      },
    },
  });

  await prisma.issue.create({
    data: {
      sentiment: "Neutral",
      source: "Customer Feedback",
      description: "Platform Functionality and Trading Options",
      critical: false,
      team: "Product",
      priority: "Low",
      feedbacks: {
        connect: [{ id: user4.feedbacks[0].id }, { id: user4.feedbacks[1].id }],
      },
    },
  });

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
