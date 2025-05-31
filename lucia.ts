import { Lucia } from "lucia";
import { prisma } from "@lucia-auth/adapter-prisma";
import { github } from "@lucia-auth/oauth/providers/github";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export const auth = new Lucia(prisma(prismaClient), {
	sessionCookie: {
		name: "session",
		expires: false,
		attributes: {
			secure: false
		}
	}
});

export const githubAuth = github(auth, {
	clientId: process.env.GITHUB_CLIENT_ID!,
	clientSecret: process.env.GITHUB_CLIENT_SECRET!,
	redirectUri: process.env.GITHUB_CALLBACK_URL!
});

declare module "lucia" {
	interface Register {
		Auth: typeof auth;
	}
}
