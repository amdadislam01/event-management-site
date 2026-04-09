import Google from "next-auth/providers/google";

export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || "temp",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || "temp",
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        // Capture image from either 'image' (Credentials/DB) or 'picture' (Google)
        token.image = user.image || user.picture;
      }
      if (trigger === "update" && session) {
        const updateData = session.user || session;
        if (updateData.name) token.name = updateData.name;
        if (updateData.image) token.image = updateData.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.image = token.image;
      }
      return session;
    },
  },
};
