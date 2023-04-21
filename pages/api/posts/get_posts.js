import { connectToDatabase } from "../../../db/connectToDatabase"

const handler = async (req, res) => {
  if(req.method !== 'GET') {
    return
  }

  const client = await connectToDatabase()
  const db = await client.db('posts')
  const postsCollection = db.collection('posts')

  const allPosts = await postsCollection.find().toArray()

  res.status(200).json({
    posts: allPosts
  })

  client.close()

}

export default handler 