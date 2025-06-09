-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "suspended" BOOLEAN NOT NULL DEFAULT false,
    "superuser" BOOLEAN NOT NULL DEFAULT false,
    "monitorId" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "min" INTEGER NOT NULL DEFAULT 6,
    "preferred" INTEGER NOT NULL DEFAULT 8,
    "max" INTEGER NOT NULL DEFAULT 10,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Monitor" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'My Monitor',
    "running" BOOLEAN NOT NULL DEFAULT false,
    "started" TIMESTAMP(3) NOT NULL,
    "stopped" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Monitor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Log" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "stop" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "quality" INTEGER NOT NULL DEFAULT 5,
    "userId" TEXT,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_monitorId_key" ON "User"("monitorId");

-- CreateIndex
CREATE UNIQUE INDEX "User_profileId_key" ON "User"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_id_key" ON "Profile"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Monitor_id_key" ON "Monitor"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Log_id_key" ON "Log"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Log_userId_key" ON "Log"("userId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_monitorId_fkey" FOREIGN KEY ("monitorId") REFERENCES "Monitor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
