import { AppProps } from 'next/app'
import '../styles/index.css'
import 'primereact/resources/themes/nova-light/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import {AuthProvider} from '../contexts/authenticantion.context'


function MyApp({ Component, pageProps }: AppProps) {
  return (
<AuthProvider>
 <Component {...pageProps} />
</AuthProvider>
  )
}

export default MyApp