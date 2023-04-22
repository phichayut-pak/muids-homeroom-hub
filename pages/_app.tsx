import '../styles/globals.css'
import type { AppProps } from 'next/app'
import SideBarDesktop from '../components/Navbar/SideBarDesktop'
import Layout from '../components/layout'
import { useRouter } from 'next/router'
import { register } from 'swiper/element/bundle';
import { SessionProvider } from "next-auth/react"
import Router from 'next/router'
import { useState } from 'react'
import Loading from '../components/Loading'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  register()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  Router.events.on('routeChangeStart', () => setLoading(true))
  Router.events.on('routeChangeComplete', () => setLoading(false))
  Router.events.on('routeChangeError', () => setLoading(false))

  return (
    <div>
      { loading && <Loading /> }
      { !loading && <SessionProvider session={pageProps.session}>
      <div className='flex'>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </SessionProvider>}
    </div>

    
  
  
  )
}

export default MyApp
