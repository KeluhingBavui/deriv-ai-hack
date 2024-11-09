-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "age" INTEGER NOT NULL,
    "tradingStyle" TEXT NOT NULL,
    "expertiseLevel" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "preferredContact" TEXT NOT NULL,
    "platformUsage" REAL NOT NULL,
    "npsScore" INTEGER NOT NULL,
    "csatScore" BOOLEAN NOT NULL,
    "cesScore" INTEGER NOT NULL,
    "recentlyReportedIssue" BOOLEAN NOT NULL DEFAULT false,
    "feedbackFrequency" INTEGER NOT NULL,
    "accountAge" INTEGER NOT NULL,
    "lastAction" TEXT NOT NULL,
    "deltaNps" REAL NOT NULL,
    "deltaCsat" REAL NOT NULL,
    "deltaCes" REAL NOT NULL,
    "simulationDate" DATETIME NOT NULL,
    "lastFeedbackDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "sentiment" TEXT NOT NULL DEFAULT 'Neutral',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "issueId" TEXT,
    CONSTRAINT "Feedback_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Issue" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sentiment" TEXT NOT NULL DEFAULT 'Neutral',
    "source" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "critical" BOOLEAN NOT NULL DEFAULT false,
    "team" TEXT NOT NULL,
    "priority" TEXT NOT NULL DEFAULT 'Medium',
    "notified" BOOLEAN NOT NULL DEFAULT false,
    "notifiedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
