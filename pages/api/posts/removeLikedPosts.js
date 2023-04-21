import { connectToDatabase } from '../../../db/connectToDatabase'
import { ObjectId } from 'mongodb'

const handler = async (req, res) => {
  if(req.method !== 'PATCH') {
    return
  }

  const client = await connectToDatabase()
  const db = await client.db('auth')
  const collection = db.collection('users')
  const { currentLikedPosts, unlikedPosts } = req.body
  const postLiked = currentLikedPosts.filter(likedPosts => !unlikedPosts.includes(likedPosts))

  // console.log('Current:' + currentLikedPosts)
  // console.log('Remove: ' + unlikedPosts)
  // console.log(currentLikedPosts.filter(likedPosts => !unlikedPosts.includes(likedPosts)))



  const result = await collection.updateOne(
    { _id: new ObjectId(req.body._id) },
    { $set: { postLiked: postLiked } }
  );

  res.status(200).json({
    message: 'Posts updated successfully',
    body: result
  })

  client.close()

}

export default handler 