-- CreateEnum
CREATE TYPE "WorkLevel" AS ENUM ('None', 'Minor', 'Medium', 'Major');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "homes" (
    "id" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "attendedShowing" BOOLEAN NOT NULL DEFAULT false,
    "wantsShowing" BOOLEAN NOT NULL DEFAULT false,
    "needsWork" BOOLEAN NOT NULL DEFAULT false,
    "workLevel" "WorkLevel" NOT NULL DEFAULT E'None',
    "rating" INTEGER NOT NULL DEFAULT 0,
    "purchaseCandidate" BOOLEAN NOT NULL DEFAULT false,
    "extraInfo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "listId" TEXT,

    CONSTRAINT "homes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "home_list" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "home_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SharedList" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "listId" TEXT NOT NULL,

    CONSTRAINT "SharedList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "homes_link_key" ON "homes"("link");

-- AddForeignKey
ALTER TABLE "homes" ADD CONSTRAINT "homes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "homes" ADD CONSTRAINT "homes_listId_fkey" FOREIGN KEY ("listId") REFERENCES "home_list"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "home_list" ADD CONSTRAINT "home_list_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedList" ADD CONSTRAINT "SharedList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedList" ADD CONSTRAINT "SharedList_listId_fkey" FOREIGN KEY ("listId") REFERENCES "home_list"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
