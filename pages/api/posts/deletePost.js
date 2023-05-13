import { connectToDatabase } from '../../../db/connectToDatabase'
import { ObjectId } from 'mongodb'

const handler = async (req, res) => {
  if(req.method !== 'PATCH') {
    return
  }

  const client = await connectToDatabase()
  const db = await client.db('posts')
  const collection = db.collection('posts')

  console.log(req.body._id)
  const result = await collection.deleteOne(
    { _id: new ObjectId(req.body._id)   },
  );



  res.status(200).json({

    result
    
  })



  client.close()

}


export default handler 