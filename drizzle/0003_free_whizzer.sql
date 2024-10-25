ALTER TABLE "snippets" ALTER COLUMN "language" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "folders" ADD CONSTRAINT "folders_name_unique" UNIQUE("name");