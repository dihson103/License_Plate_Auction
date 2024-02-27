import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        const res = await fetch('http://localhost:6001/auth', {
          method: 'POST',
          body: JSON.stringify({ user: credentials?.username, password: credentials?.password }),
          headers: { 'Content-Type': 'application/json' }
        })
        const user = await res.json()

        console.log(user)

        if (res.ok && user) {
          return user
        }
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token, user }) {
      session.user = token as any
      return session
    }
  },
  pages: {
    signIn: '/login'
  }
})
