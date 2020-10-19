# Migration `20201013150541-init`

This migration has been generated at 10/13/2020, 5:05:41 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."User" (
"email" text   NOT NULL ,
"name" text   NOT NULL ,
"phone_number" text   NOT NULL ,
"id" SERIAL,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Team" (
"name" text   NOT NULL ,
"owner_id" integer   NOT NULL ,
"id" SERIAL,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."_TeamToUser" (
"A" integer   NOT NULL ,
"B" integer   NOT NULL 
)

CREATE UNIQUE INDEX "User.email_unique" ON "public"."User"("email")

CREATE UNIQUE INDEX "User.name_unique" ON "public"."User"("name")

CREATE UNIQUE INDEX "User.phone_number_unique" ON "public"."User"("phone_number")

CREATE UNIQUE INDEX "Team.name_unique" ON "public"."Team"("name")

CREATE UNIQUE INDEX "_TeamToUser_AB_unique" ON "public"."_TeamToUser"("A", "B")

CREATE INDEX "_TeamToUser_B_index" ON "public"."_TeamToUser"("B")

ALTER TABLE "public"."_TeamToUser" ADD FOREIGN KEY ("A")REFERENCES "public"."Team"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."_TeamToUser" ADD FOREIGN KEY ("B")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201013150541-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,25 @@
+generator client {
+  provider = "prisma-client-js"
+}
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+model User {
+  email String  @unique
+  name  String  @unique
+  phone_number String  @unique
+  id    Int     @default(autoincrement()) @id
+  teams Team[] @relation(references: [id])
+}
+
+model Team {
+  name String @unique
+  owner_id  Int
+  user_id User[] @relation(references: [id])
+  id        Int     @default(autoincrement()) @id
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+}
```


