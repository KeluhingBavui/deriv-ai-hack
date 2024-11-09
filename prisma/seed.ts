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
    },
    {
      content: "I've been using Deriv for over 5 years now and I must say their platform stability is outstanding. The charts are responsive, execution is quick, and their customer service team actually knows what they're talking about. Recently they added new features to the mobile app which made trading on the go much easier. Highly recommended for serious traders!",
      sentiment: "Positive",
    },
    {
      content: "STAY AWAY from this platform! Lost $2000 due to 'technical issues' during a crucial trade. When I contacted support, they kept passing me around different departments with no resolution. It's been 3 weeks and still no proper explanation. They only care about taking your money. SCAMMERS!",
      sentiment: "Negative",
    },
    {
      content: "The withdrawal process has improved significantly over the past few months. Used to take 2-3 days, now I get my money within hours. The new verification system is also much smoother. Just wish they would add more payment methods for my region. Overall satisfied with the service.",
      sentiment: "Positive",
    },
    {
      content: "My account got restricted without any warning. They claim I violated their terms but won't specify which ones. I've been trading legitimately for 2 years, never had any issues. Now they're holding my funds hostage. Multiple emails sent, no proper response. This is completely unprofessional!",
      sentiment: "Negative",
    },
    {
      content: "What I appreciate most about Deriv is their educational resources. The tutorial videos and webinars really helped me understand the basics of trading. The demo account is great for practice. Would be nice if they could add more advanced strategy tutorials though. Keep up the good work!",
      sentiment: "Positive",
    },
    {
      content: "Platform keeps crashing during peak trading hours. Lost money multiple times because I couldn't close my positions. Customer service just gives generic responses about 'investigating the issue.' Save yourself the headache and trade elsewhere. These people don't care about their customers at all.",
      sentiment: "Negative",
    },
    {
      content: "Been using Deriv for forex trading since 2019. Their spreads are competitive and the platform is user-friendly. Recently they've added more currency pairs which is great. The only improvement needed is faster chart loading times during market opening hours. But overall, very satisfied with my experience.",
      sentiment: "Positive",
    },
    {
      content: "Absolutely terrible experience. Tried to deposit $500 but they charged my card twice. Support team is useless - kept saying they'll 'escalate' the issue but nothing happened. Had to dispute with my bank to get the money back. Don't trust them with your money!",
      sentiment: "Negative",
    },
    {
      content: "Great improvements to the platform lately! The new risk management tools are really helpful, especially the trailing stop loss feature. Also love the new market analysis section. One suggestion: please add more indicators for technical analysis. Otherwise, fantastic service!",
      sentiment: "Positive",
    },
    {
      content: "I'm a beginner trader and Deriv has been perfect for learning. The interface isn't overwhelming, customer support is patient with questions, and the minimum deposit requirement is reasonable. Would love to see more educational content for different trading strategies. Thank you for making trading accessible!",
      sentiment: "Positive",
    }
  ];

  // Create issues for different categories
  const issues = [
    {
      sentiment: "Negative",
      source: "Trust Pilot",
      description: "Platform Technical Issues: Crashes, delays, and unexpected behavior during trading",
      critical: true,
      team: "Engineering",
      priority: "High",
      notified: true,
      notifiedAt: new Date(),
    },
    {
      sentiment: "Negative",
      source: "Trust Pilot",
      description: "Account Access & Restrictions: Unexpected blocks and payment verification issues",
      critical: true,
      team: "Risk and Compliance",
      priority: "High",
      notified: true,
      notifiedAt: new Date(),
    },
    {
      sentiment: "Negative",
      source: "Trust Pilot",
      description: "Customer Service Response: Slow resolution times and communication issues",
      critical: false,
      team: "Customer Support",
      priority: "Medium",
      notified: true,
      notifiedAt: new Date(),
    },
    {
      sentiment: "Negative",
      source: "Live Chat",
      description: "Payment & Withdrawal Processing: Delays and transaction disputes",
      critical: true,
      team: "Finance",
      priority: "High",
      notified: true,
      notifiedAt: new Date(),
    },
    {
      sentiment: "Neutral",
      source: "Live Chat",
      description: "Feature Requests: Trading tools and platform improvements",
      critical: false,
      team: "Product",
      priority: "Medium",
      notified: false,
      notifiedAt: null,
    },
    {
      sentiment: "Positive",
      source: "Trust Pilot",
      description: "Educational Content Feedback: Tutorial and learning resources",
      critical: false,
      team: "Product",
      priority: "Low",
      notified: false,
      notifiedAt: null,
    }
  ];

  // Create all issues
  const createdIssues = await Promise.all(
    issues.map(issue => prisma.issue.create({ data: issue }))
  );

  // Helper function to determine which issue a feedback belongs to
  const determineIssueId = (feedback: { content: string; sentiment: string }) => {
    const content = feedback.content.toLowerCase();
    
    // For negative feedback
    if (feedback.sentiment === "Negative") {
      // Platform Technical Issues - be more specific about technical problems
      if (content.includes('crash') || 
          content.includes('bug') ||
          content.includes('error') ||
          (content.includes('technical') && content.includes('issue')) ||
          (content.includes('platform') && (
            content.includes('slow') || 
            content.includes('down') || 
            content.includes('broken')
          ))) {
        return createdIssues[0].id;
      }
      
      // Account Access & Restrictions
      if (content.includes('blocked') || 
          content.includes('restricted') || 
          content.includes('locked') ||
          content.includes('access denied') ||
          content.includes('cant log in')) {
        return createdIssues[1].id;
      }
      
      // Customer Service Response
      if (content.includes('support') || 
          content.includes('customer service') || 
          content.includes('response time') ||
          content.includes('no reply') ||
          content.includes('waiting for help')) {
        return createdIssues[2].id;
      }
      
      // Payment & Withdrawal Processing
      if (content.includes('withdrawal') || 
          content.includes('deposit') || 
          content.includes('payment') ||
          content.includes('transaction') ||
          content.includes('money')) {
        return createdIssues[3].id;
      }
    }

    // For positive feedback
    if (feedback.sentiment === "Positive") {
      // Educational Content Feedback - be more specific
      if (content.includes('tutorial') || 
          content.includes('learning') || 
          content.includes('education') ||
          content.includes('course') ||
          content.includes('training')) {
        return createdIssues[5].id;
      }
    }

    // Default to feature requests for:
    // 1. Neutral sentiment
    // 2. Unmatched positive feedback
    // 3. General improvement suggestions
    if (content.includes('feature') ||
        content.includes('suggest') ||
        content.includes('improve') ||
        content.includes('would be nice') ||
        content.includes('add')) {
      return createdIssues[4].id;
    }

    // If no specific category matches, assign based on sentiment
    if (feedback.sentiment === "Negative") {
      return createdIssues[2].id; // Default negative to Customer Service
    }
    if (feedback.sentiment === "Positive") {
      return createdIssues[5].id; // Default positive to Educational Content
    }
    
    return createdIssues[4].id; // Default neutral to Feature Requests
  };

  // Create all feedbacks with appropriate issue links
  await Promise.all(
    feedbacks.map(feedback => 
      prisma.feedback.create({
        data: {
          ...feedback,
          issueId: determineIssueId(feedback)
        }
      })
    )
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
