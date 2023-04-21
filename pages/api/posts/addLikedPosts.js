import { connectToDatabase } from '../../../db/connectToDatabase'
import { ObjectId } from 'mongodb'

const handler = async (req, res) => {
  if(req.method !== 'PATCH') {
    return
  }

  const client = await connectToDatabase()
  const db = await client.db('auth')
  const collection = db.collection('users')

  const result = await collection.updateOne(
    { _id: new ObjectId(req.body._id) },
    { $push: { postLiked: { $each: req.body.likedPosts } } }
  );

  res.status(200).json({
    message: 'Liked Posts updated successfully',
    body: result
  })

  client.close()

}

export default handler 