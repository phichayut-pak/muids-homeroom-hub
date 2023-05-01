




const handler = async (req, res) => {
  if(req.method !== 'POST') {
    return
  } 

  



  res.status(200).json({
    message: 'Images uploaded successfully',
  })

  


}

export default handler 