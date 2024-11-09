import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const tradingStyles = [
    "day trading",
    "swing trading",
    "position trading",
    "scalping",
    "algorithmic trading",
  ];
  const expertiseLevels = ["beginner", "intermediate", "expert", "professional"];
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

  // Generate 100 users
  const users = Array.from({ length: 100 }, () => ({
    age: Math.floor(Math.random() * (65 - 18) + 18),
    tradingStyle: tradingStyles[Math.floor(Math.random() * tradingStyles.length)],
    expertiseLevel: expertiseLevels[Math.floor(Math.random() * expertiseLevels.length)],
    region: regions[Math.floor(Math.random() * regions.length)],
    preferredContact: contacts[Math.floor(Math.random() * contacts.length)],
    platformUsage: Number((Math.random() * 0.8 + 0.1).toFixed(2)),
    npsScore: Math.floor(Math.random() * 11),
    csatScore: Math.random() > 0.5,
    cesScore: Math.floor(Math.random() * 11),
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

  // Create all users
  await prisma.user.createMany({
    data: users
  });

  // Create issue first
  const issue = await prisma.issue.create({
    data: {
      sentiment: "Neutral",
      source: "Trust Pilot",
      description: "Product works as expected but could use more features",
      critical: false,
      team: "Engineering",
      priority: "Low",
      notified: false,
      notifiedAt: null,
    }
  });

  // Create all feedbacks and link them to the issue
  const feedbacks = [
    {
      content: "Best broker in town wokring with deriv from last 10 years. Best & reliable platform for trading having unique assets like vol crash boom step etc also all other pairs gold btc are also available with very low spread and fee. Also 24 7 support team and live chat support make it more reliable and flexible to work with so far great experience and most recommended broker to trade...",
      sentiment: "Positive",
    },
    {
      content: "It's been great trading with deriv.It has all good qualities the withdrawals system is very good and easy to navigate also I what I like most about deriv is their tight spreads it increases the good chances to make profit even though there's risk. But am grateful to trade with deriv and am happy with their honesty and integrity.",
      sentiment: "Positive",
    },
    {
      content: "Hello Deriv.I really appreciate for this product. I buy and sell any time l want to.I greatly appreciate the security attached to it.Even a complaint is raised you thoroughly investigate and make an informed decision. I have never lost money here! this is very good site.",
      sentiment: "Positive",
    },
    {
      content: "I'd never trade in their platform again, Deriv X...placed 2 V75s SELL the next thing I'm taken out by 2 BUY TRADES that I never placed...to make it worse, they say I gave my credentials to somebody else. I stay alone and nobody knows I'm trading and I'VE NEVER SHARED my details with anyone and I only use my phone, not a laptop or PC, no other device. It's cool but they're never gonna see my money again because this was not the first time this happening but I turned a blind eye at first. I reverse any good rating I once gave them even though it was after the similar incident.",
      sentiment: "Negative",
    },
    {
      content: "Deriv is great, the transactions are seamless. They are dependable. Improvements that can be made: - remove the delay on entries, make entries instant. - Make candle sticks of durations 5s, 10s, 15s and 30s - Include Volatility 10 (1s), 25 (1s), 50 (1s), 75 (1s) and 100 (1s) indices in the trading view platform.",
      sentiment: "Positive",
    },
    {
      content: "I have noticed recently that when you do a withdrawal through Ozow, the time frame of waiting your money is much shorter now. Unlike before when you withdraw in the morning before 06:00 you will only get your money after 18:00 pm. And I believe that as time goes by the time frame will be much shorter than 2 hours.",
      sentiment: "Positive",
    },
    {
      content: "My trading account (Cr3851681) has been unfairly and permanently blocked by Deriv. Their reasoning? \"Excessive deposits and withdrawals.\" Let's be clear here: in the last six months, I have incurred a loss of nearly $1500 USD—about 500,000 Sri Lankan rupees. That's a significant amount in my country, but Deriv seems unbothered by the damage done to its customers...",
      sentiment: "Negative",
    },
    {
      content: "My cashier is locked. And on livechat I was told it's because I shared payment method with another customer. I didn't share my payment method with anyone. Though I had a past account, which is deleted now, that shared same payment method with my present account. A ticket has been raised already. And there's no response yet. I will come and update to 5star when my issue is resolved. Thank you.",
      sentiment: "Negative",
    },
    {
      content: "Deriv is not honest .they manipulate their derived instrument. They cheat very well .you will never make profit with deriv .the house always wins.scam, thieves..no fair play. If you want to be poor trade with deriv.",
      sentiment: "Negative",
    },
    {
      content: "Execution of trades Easy to use the platform portal Deposited is easy NB Please share trading strategy for your loyalty customer",
      sentiment: "Positive",
    }
  ];

  // Create all feedbacks
  await Promise.all(
    feedbacks.map(feedback => 
      prisma.feedback.create({
        data: {
          ...feedback,
          issueId: issue.id
        }
      })
    )
  );

  console.log("Seeding completed with 100 users, 10 feedback entries, and 1 issue.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
