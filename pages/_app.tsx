import '../styles/globals.css'
import type { AppProps } from 'next/app'
import SideBarDesktop from '../components/Navbar/SideBarDesktop'
import Layout from '../components/layout'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  
  return (
    <div className='flex'>
      {router.pathname === "/404" ? "" : 
      <Layout>
        <Component {...pageProps} />
      </Layout>
      }
      
    </div>
  
  )
}

export default MyApp
