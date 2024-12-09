-- CreateTable
CREATE TABLE "ErrorLog" (
    "id" SERIAL NOT NULL,
    "statusCode" TEXT,
    "code" TEXT,
    "path" TEXT,
    "message" TEXT,
    "timestamp" TIMESTAMP(3),
    "request" TEXT,
    "user" TEXT,
    "reference" TEXT,
    "headers" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ErrorLog_id_key" ON "ErrorLog"("id");
