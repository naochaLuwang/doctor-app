import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../../utils/db";
import bcrypt from "bcrypt";
import AdminLogin from "../../../models/AdminLogin";

export default NextAuth({
  // session: {
  //   strategy: "jwt",
  //   maxAge: 24 * 60 * 60,
  // },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userName: { label: "User Name", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        await dbConnect();

        const userName = credentials.userName;
        const password = credentials.password;

        const user = await AdminLogin.findOne({ userName });

        if (!user) {
          throw new Error("Invalid credentials");
        }

        if (user) {
          if (!user.password) {
            throw new Error("Invalid password or email");
          }

          const isMatch = await bcrypt.compare(password, user.password);

          if (!isMatch) {
            throw new Error("Invalid password or email");
          }

          return {
            name: user.userName,
          };
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  secret: "secret",
  database: process.env.MONGODB_URI,
  // callbacks: {
  //   session: async (session, user, sessionToken) => {
  //     session.user.name = user.userName;
  //     return Promise.resolve(session);
  //   },
  // },
});

// const signInUser = async ({ password, user }) => {};
