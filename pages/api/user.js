import { connectToDatabase } from "../../db/connectToDatabase"
import { ObjectId } from 'mongodb'

const handler = async (req, res) => {
  if(req.method !== 'GET') {
    return
  }

  console.log(req.query)
  const client = await connectToDatabase();
  const usersCollection = client.db('auth').collection('users');
  const user = await usersCollection.findOne({ _id: new ObjectId(req.query._id) })

  res.status(200).json({
    user: user
  })

  client.close()

}

export default handler 