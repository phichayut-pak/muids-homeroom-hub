import { connectToDatabase } from '../../../db/connectToDatabase'
import { ObjectId } from 'mongodb'

const handler = async (req, res) => {
  if(req.method !== 'PATCH') {
    return
  }

  const client = await connectToDatabase()
  const db = await client.db('posts')
  const collection = db.collection('posts')

  await collection.updateOne(
    { _id: new ObjectId(req.body._id) },
    { $set: { like: req.body.like } }
  );

  res.status(200).json({
    message: 'Post updated successfully',
    body: req.body
  })

  client.close()

}

export default handler 