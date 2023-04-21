import '../styles/globals.css'
import type { AppProps } from 'next/app'
import SideBarDesktop from '../components/Navbar/SideBarDesktop'
import Layout from '../components/layout'
import { useRouter } from 'next/router'
import { register } from 'swiper/element/bundle';
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  register()
  return (
    <SessionProvider session={pageProps.session}>
      <div className='flex'>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </SessionProvider>
  
  )
}

export default MyApp
