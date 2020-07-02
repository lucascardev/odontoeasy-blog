import { AppProps } from 'next/app'
import '../styles/index.css'
import '../node_modules/primereact/resources/themes/nova-light/theme.css'
import '../node_modules/primereact/resources/primereact.min.css'
import '../node_modules/primeicons/primeicons.css'
import '../node_modules/react-markdown-editor-lite/lib/index.css';
import {AuthProvider} from '../contexts/authenticantion.context'


function MyApp({ Component, pageProps }: AppProps) {
  return (
<AuthProvider>
 <Component {...pageProps} />
</AuthProvider>
  )
}

export default MyApp