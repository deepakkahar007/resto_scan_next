CREATE TABLE "address" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"address_line_1" varchar NOT NULL,
	"address_line_2" varchar,
	"city" varchar NOT NULL,
	"state" varchar NOT NULL,
	"country" varchar NOT NULL,
	"pincode" varchar NOT NULL,
	"restaurent_id" uuid NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"category" varchar NOT NULL,
	"logo_url" varchar NOT NULL,
	"bestseller" boolean DEFAULT false,
	"is_new" boolean DEFAULT false,
	"restaurent_id" uuid NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"title" varchar NOT NULL,
	"discription" varchar NOT NULL,
	"cuisine_type" varchar,
	"price" integer NOT NULL,
	"restaurent_id" uuid NOT NULL,
	"categories_id" uuid NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "restaurent_profile" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar NOT NULL,
	"description" varchar NOT NULL,
	"cuisine_type" varchar[] NOT NULL,
	"logo_url" varchar NOT NULL,
	"cover_image_url" varchar,
	"available_tables" integer NOT NULL,
	"userId" text NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "sub_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"sub_item_title" varchar NOT NULL,
	"size" varchar NOT NULL,
	"price" integer NOT NULL,
	"item_id" uuid NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL UNIQUE,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY,
	"name" text NOT NULL,
	"email" text NOT NULL UNIQUE,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "unique_user_id" ON "restaurent_profile" ("userId");--> statement-breakpoint
CREATE INDEX "account_userId_idx" ON "account" ("user_id");--> statement-breakpoint
CREATE INDEX "session_userId_idx" ON "session" ("user_id");--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "verification" ("identifier");--> statement-breakpoint
ALTER TABLE "address" ADD CONSTRAINT "address_restaurent_id_restaurent_profile_id_fkey" FOREIGN KEY ("restaurent_id") REFERENCES "restaurent_profile"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_restaurent_id_restaurent_profile_id_fkey" FOREIGN KEY ("restaurent_id") REFERENCES "restaurent_profile"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "items" ADD CONSTRAINT "items_restaurent_id_restaurent_profile_id_fkey" FOREIGN KEY ("restaurent_id") REFERENCES "restaurent_profile"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "items" ADD CONSTRAINT "items_categories_id_categories_id_fkey" FOREIGN KEY ("categories_id") REFERENCES "categories"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "sub_items" ADD CONSTRAINT "sub_items_item_id_items_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id");--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;