import GitHubProvider from "next-auth/providers/github";
import NextAuth from "next-auth";
const authOptions=NextAuth({
providers: [
  GitHubProvider({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET
  })
]})
export {authOptions as GET, authOptions as POST}