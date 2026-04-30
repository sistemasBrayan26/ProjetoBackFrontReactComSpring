import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Auth0Provider from "next-auth/providers/auth0";

export default NextAuth({
  providers: [
    // GitHub Provider
    GithubProvider({
      clientId: "Iv23liyprruxRBFzZxbd",
      clientSecret: "2e4c44114419bd23d4007ae43741a8bf480de687",
    }),
    Auth0Provider({
      clientId: "QuarTaPt5xtgCr4VvVVogK0lSXNXTYl6",
      clientSecret:
        "D6VAu695yALKc0f5odU99k6-InicN4iqlte95n8K7K6fqNnRD2szyUgeDuLlS0Ko",
    }),
  ],
});
