import Header from '@/components/header'
import Template from '@/components/template'
import { ComprasProvider } from '@/context/compras.context'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
  <ComprasProvider>
    <Template>
      <Component {...pageProps} />
    </Template>
  </ComprasProvider>  
  )
}
