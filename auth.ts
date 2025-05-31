import { Router } from "express";
import { githubAuth, auth } from "../auth/lucia.js";

export const authRouter = Router();

authRouter.get("/github", async (req, res) => {
	const [url, state] = await githubAuth.getAuthorizationUrl();
	res.cookie("github_oauth_state", state, { httpOnly: true });
	res.redirect(url);
});

authRouter.get("/github/callback", async (req, res) => {
	const state = req.cookies.github_oauth_state;
	const code = req.query.code?.toString() || "";

	const result = await githubAuth.validateCallback(code, state ?? "");
	if (result === null) return res.status(400).send("Invalid OAuth state");

	const { user, session } = await auth.createUserSession(result.userId, {});
	res.cookie("session", session.sessionId, { httpOnly: true });
	res.send("Authentication successful");
});
