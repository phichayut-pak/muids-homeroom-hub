import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDatabase } from "../../../db/connectToDatabase"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"
import { ObjectId } from "mongodb"


export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "6461146" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const client = await connectToDatabase();

        const usersCollection = client.db('auth').collection('users');

        const user = await usersCollection.findOne({ username: credentials.username })

        if(!user) {
          client.close()
          throw new Error('No user found!')
        }

        // Not very secure, but the password should already be encrypted from the school database
        // This is just a demo. However, it should be verified using import { compare } from 'bcryptjs' instead if it was actually used
        const isValid = await user.password === credentials.password

        if(!isValid) {
          client.close()
          throw new Error('Could not log you in!')
        }

        client.close()  


        return { 
          user
        }


      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ token, session, user}) {
      // const { session, token, credentials } = params
      session.user = token.user

      const client = await connectToDatabase();

      const usersCollection = client.db('auth').collection('users');

      const response = await usersCollection.findOne({ _id: new ObjectId(session.user._id) })


      session.user.postLiked = response.postLiked 

      client.close()
      
      

      return session
    }
    
  },
  
  secret: process.env.NEXTAUTH_SECRET,
  url: 'localhost:3000'


})