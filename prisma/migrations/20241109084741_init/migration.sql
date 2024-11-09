-- CreateTable
CREATE TABLE "Issue" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sentiment" TEXT NOT NULL DEFAULT 'Neutral',
    "source" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "critical" BOOLEAN NOT NULL DEFAULT false,
    "team" TEXT NOT NULL,
    "priority" TEXT NOT NULL DEFAULT 'Medium',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
