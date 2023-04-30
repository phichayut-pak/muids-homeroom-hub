import '../styles/globals.css'
import type { AppProps } from 'next/app'
import SideBarDesktop from '../components/Navbar/SideBarDesktop'
import Layout from '../components/layout'
import { useRouter } from 'next/router'
import { register } from 'swiper/element/bundle';
import { SessionProvider } from "next-auth/react"
import Router from 'next/router'
import { useState, useEffect } from 'react'
import WholeLoading from '../components/WholeLoading'
import Head from 'next/head'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  register()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  Router.events.on('routeChangeStart', () => setLoading(true))
  Router.events.on('routeChangeComplete', () => setLoading(false))
  Router.events.on('routeChangeError', () => setLoading(false))
  const [theme, setTheme] = useState<any>('light')

  useEffect(() => {
    if(typeof window !== undefined) {
      setTheme(localStorage.getItem('theme'))

    }
  })


  return (
    <SessionProvider session={pageProps.session}>
        <Head>
          <title>MUIDS | Homeroom Hub</title>
          <meta name="description" content="A website to make homeroom easier and better for MUIDS" />
          <link rel="icon" href="/favicon.ico" />
      </Head>
      { loading && <WholeLoading theme={theme} /> }
      { !loading &&
      <div className='flex'>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    }
    </SessionProvider>

    
  
  
  )
}

export default MyApp
