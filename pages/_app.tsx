import { AppProps } from 'next/app'
import '../styles/index.css'
import {AuthProvider} from '../contexts/authenticantion.context'


function MyApp({ Component, pageProps }: AppProps) {
  return (
<AuthProvider>
 <Component {...pageProps} />
</AuthProvider>
  )
}

export default MyApp