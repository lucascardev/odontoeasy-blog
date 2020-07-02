import { AppProps } from 'next/app'
import '../styles/index.css'
import '../styles/theme.css'
import '../styles/primereact.css'
import 'primeicons/primeicons.css'
import '../styles/reactmarkdowneditor.css';
import {AuthProvider} from '../contexts/authenticantion.context'


function MyApp({ Component, pageProps }: AppProps) {
  return (
<AuthProvider>
 <Component {...pageProps} />
</AuthProvider>
  )
}

export default MyApp