import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import Post from '../components/Posts/Post'


const Home: NextPage = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false)
  useEffect(() => {
    themeCheck()
  })

  const themeCheck = () => {
    if(localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setDarkMode(true)
    } else{
      setDarkMode(false)
    }
  }

  return (
    <div className={` w-screen  md:h-auto md:w-full flex justify-center items-center`}>
      <Head>
        <title>MUIDS | Homeroom Hub</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex flex-col justify-center items-center w-full md:mt-0 md:py-0 md:my-10 space-y-5'>
        <Post profile_pic='https://i2-prod.mirror.co.uk/incoming/article25609246.ece/ALTERNATES/s1200d/0_PUSS-IN-BOOTS.jpg' author='Pak' post_pic={['https://i2-prod.mirror.co.uk/incoming/article25609246.ece/ALTERNATES/s1200d/0_PUSS-IN-BOOTS.jpg', 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2020%2F06%2F26%2Ftiny-white-kitten-873941684-2000.jpg']} like={30} time='3 days ago' title='First Test' description='Lorem ipsum dolor sit amet consectetur, Lorem ipsum dolor sit amet consectetur, Lorem ipsum dolor sit amet consectetur, Lorem ipsum dolor sit amet consectetur, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil repellat ea eveniet nulla error, dolore, repudiandae sapiente suscipit, odit in ipsam perferendis similique fugit. Debitis cupiditate obcaecati totam minus nobis!
'></Post>
<Post profile_pic='https://i2-prod.mirror.co.uk/incoming/article25609246.ece/ALTERNATES/s1200d/0_PUSS-IN-BOOTS.jpg' author='Pak' post_pic={['https://i2-prod.mirror.co.uk/incoming/article25609246.ece/ALTERNATES/s1200d/0_PUSS-IN-BOOTS.jpg']} like={30} time='3 days ago' title='First Test' description='Lorem ipsum dolor sit amet consectetur, Lorem ipsum dolor sit amet consectetur, Lorem ipsum dolor sit amet consectetur, Lorem ipsum dolor sit amet consectetur, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil repellat ea eveniet nulla error, dolore, repudiandae sapiente suscipit, odit in ipsam perferendis similique fugit. Debitis cupiditate obcaecati totam minus nobis!
'></Post><Post profile_pic='https://i2-prod.mirror.co.uk/incoming/article25609246.ece/ALTERNATES/s1200d/0_PUSS-IN-BOOTS.jpg' author='Pak' post_pic={['https://i2-prod.mirror.co.uk/incoming/article25609246.ece/ALTERNATES/s1200d/0_PUSS-IN-BOOTS.jpg']} like={30} time='3 days ago' title='First Test' description='Lorem ipsum dolor sit amet consectetur, Lorem ipsum dolor sit amet consectetur, Lorem ipsum dolor sit amet consectetur, Lorem ipsum dolor sit amet consectetur, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil repellat ea eveniet nulla error, dolore, repudiandae sapiente suscipit, odit in ipsam perferendis similique fugit. Debitis cupiditate obcaecati totam minus nobis!
'></Post><Post profile_pic='https://i2-prod.mirror.co.uk/incoming/article25609246.ece/ALTERNATES/s1200d/0_PUSS-IN-BOOTS.jpg' author='Pak' post_pic={['https://i2-prod.mirror.co.uk/incoming/article25609246.ece/ALTERNATES/s1200d/0_PUSS-IN-BOOTS.jpg']} like={30} time='3 days ago' title='First Test' description='Lorem ipsum dolor sit amet consectetur, Lorem ipsum dolor sit amet consectetur, Lorem ipsum dolor sit amet consectetur, Lorem ipsum dolor sit amet consectetur, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil repellat ea eveniet nulla error, dolore, repudiandae sapiente suscipit, odit in ipsam perferendis similique fugit. Debitis cupiditate obcaecati totam minus nobis!
'></Post><Post profile_pic='https://i2-prod.mirror.co.uk/incoming/article25609246.ece/ALTERNATES/s1200d/0_PUSS-IN-BOOTS.jpg' author='Pak' post_pic={['https://i2-prod.mirror.co.uk/incoming/article25609246.ece/ALTERNATES/s1200d/0_PUSS-IN-BOOTS.jpg']} like={30} time='3 days ago' title='First Test' description='Lorem ipsum dolor sit amet consectetur, Lorem ipsum dolor sit amet consectetur, Lorem ipsum dolor sit amet consectetur, Lorem ipsum dolor sit amet consectetur, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil repellat ea eveniet nulla error, dolore, repudiandae sapiente suscipit, odit in ipsam perferendis similique fugit. Debitis cupiditate obcaecati totam minus nobis!
'></Post>

      </div>
      
    </div>
  )
}

export default Home
