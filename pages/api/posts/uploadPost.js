import { connectToDatabase } from "../../../db/connectToDatabase"
import { format, render, cancel, register } from 'timeago.js';


const handler = async (req, res) => {
  if(req.method !== 'POST') {
    return
  } 

  const { author, post_pic, title, description } = req.body
  
  const client = await connectToDatabase()
  const db = client.db('posts')
  const postsCollection = db.collection('posts')

  const result = await postsCollection.insertOne({
    profile_pic: 'https://res.cloudinary.com/dcxhciyca/image/upload/v1682948959/muids-homeroom-hub/muids-logo_reried.png',
    author,
    post_pic,
    like: 0,
    time: new Date(),
    title,
    description
  })

  res.status(200).json({
    result
    // message: 'success'
  })

  client.close()

}

export default handler 