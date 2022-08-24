-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MoneyEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "expense" INTEGER NOT NULL DEFAULT 0,
    "income" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_MoneyEntry" ("content", "created_at", "expense", "id", "income") SELECT "content", "created_at", "expense", "id", "income" FROM "MoneyEntry";
DROP TABLE "MoneyEntry";
ALTER TABLE "new_MoneyEntry" RENAME TO "MoneyEntry";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
