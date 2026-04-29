import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
  providers: [
    // GitHub Provider
    GithubProvider({
      clientId: 'Iv23liyprruxRBFzZxbd',
      clientSecret: '2e4c44114419bd23d4007ae43741a8bf480de687',
    }),
    
    
  ]
});