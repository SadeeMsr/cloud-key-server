-- CreateTable
CREATE TABLE "User" (
    "uid" TEXT NOT NULL,
    "u_name" TEXT NOT NULL,
    "keys" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_uid_key" ON "User"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "User_u_name_key" ON "User"("u_name");

-- CreateIndex
CREATE UNIQUE INDEX "User_keys_key" ON "User"("keys");
