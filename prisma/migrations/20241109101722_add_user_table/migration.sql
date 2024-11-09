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
    "csatScore" INTEGER NOT NULL,
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
