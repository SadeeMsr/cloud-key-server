/*
  Warnings:

  - You are about to drop the column `keys` on the `User` table. All the data in the column will be lost.
  - Added the required column `key` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "uid" TEXT NOT NULL,
    "u_name" TEXT NOT NULL,
    "key" TEXT NOT NULL
);
INSERT INTO "new_User" ("u_name", "uid") SELECT "u_name", "uid" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_uid_key" ON "User"("uid");
CREATE UNIQUE INDEX "User_u_name_key" ON "User"("u_name");
CREATE UNIQUE INDEX "User_key_key" ON "User"("key");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
