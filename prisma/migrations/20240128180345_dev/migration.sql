-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "marked" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "role" TEXT DEFAULT 'USER',

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logs" (
    "id" SERIAL NOT NULL,
    "marked" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "type" INTEGER NOT NULL,
    "systemID" TEXT NOT NULL,
    "data" JSONB NOT NULL
);

-- CreateTable
CREATE TABLE "images" (
    "id" SERIAL NOT NULL,
    "marked" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "owner" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "content" BYTEA NOT NULL
);

-- CreateTable
CREATE TABLE "organization" (
    "id" TEXT NOT NULL,
    "marked" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "contact" TEXT,
    "description" TEXT,
    "data" JSON,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "member" (
    "id" TEXT NOT NULL,
    "marked" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "organizationID" TEXT,
    "active" BOOLEAN DEFAULT true,
    "data" JSON NOT NULL,
    "permissions" INTEGER[],

    CONSTRAINT "member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "barangay" (
    "id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "resident" (
    "id" TEXT NOT NULL,
    "publicID" TEXT,
    "marked" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "firstname" TEXT NOT NULL,
    "middlename" TEXT,
    "lastname" TEXT NOT NULL,
    "birthdate" TEXT NOT NULL,
    "birthplace" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "citizenship" TEXT,
    "civilStatus" TEXT NOT NULL,
    "email" TEXT,
    "status" TEXT NOT NULL,
    "purok" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "religion" TEXT NOT NULL,
    "occupation" TEXT,
    "voter" BOOLEAN NOT NULL DEFAULT false,
    "PWD" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "resident_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "officials" (
    "id" SERIAL NOT NULL,
    "residentID" TEXT NOT NULL,
    "marked" BOOLEAN,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL,
    "startYear" TEXT NOT NULL,
    "endYear" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "chairmanship" TEXT NOT NULL,

    CONSTRAINT "officials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "logs_id_key" ON "logs"("id");

-- CreateIndex
CREATE UNIQUE INDEX "images_id_key" ON "images"("id");

-- CreateIndex
CREATE UNIQUE INDEX "barangay_id_key" ON "barangay"("id");

-- CreateIndex
CREATE UNIQUE INDEX "officials_residentID_key" ON "officials"("residentID");

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_systemID_fkey" FOREIGN KEY ("systemID") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_id_fkey" FOREIGN KEY ("id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_organizationID_fkey" FOREIGN KEY ("organizationID") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "barangay" ADD CONSTRAINT "barangay_id_fkey" FOREIGN KEY ("id") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resident" ADD CONSTRAINT "resident_id_fkey" FOREIGN KEY ("id") REFERENCES "barangay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "officials" ADD CONSTRAINT "officials_residentID_fkey" FOREIGN KEY ("residentID") REFERENCES "resident"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
