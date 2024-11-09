-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Issue" (
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
INSERT INTO "new_Issue" ("createdAt", "critical", "description", "id", "priority", "sentiment", "source", "team", "updatedAt") SELECT "createdAt", "critical", "description", "id", "priority", "sentiment", "source", "team", "updatedAt" FROM "Issue";
DROP TABLE "Issue";
ALTER TABLE "new_Issue" RENAME TO "Issue";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
