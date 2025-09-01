import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        Email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("====================================");
        console.log("credentials", credentials);
        console.log("req", req);
        console.log("====================================");
        // Add logic here to look up the user from the credentials supplied
        try {
          const res = await fetch(
            `${process.env.NextAuth_API_Base_URL}/api/v1/auth/signin`,
            {
              method: "POST",
              body: JSON.stringify({
                email: credentials?.Email,
                password: credentials?.password,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await res.json();

          console.log("res:", res);
          console.log('====================================');
          console.log("data:", data);
          console.log('====================================');

          if (!data.ok) {
            // Any object returned will be saved in `user` property of the JWT
            throw new Error(data.message);
          }
          const decodec = JSON.parse(JSON.stringify(data));

          return {
            id:decodec.id,
            user: data.user,
            token: data.token,
          };

        } catch (error) {
          console.log("====================================");
          console.log(error);
          console.log("====================================");
          throw new Error((error as Error).message)
        }
      },
    }),
  ],
  pages:{signIn:"/signin"},

  callbacks:{
    async jwt({ token, user }) {
      if(user){
        token.user = user.user;
        token.token = user.token
      }
      return token
    },

     async session({ session, token }) {
      if(token){
        session.user = token.user;
      }
      
      return session
    },

  }
};
