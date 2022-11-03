import "../styles/globals.css"
import type { AppProps } from "next/app"

import { Web3ReactProvider } from "@web3-react/core"
import Web3 from "web3"
import WalletConnectProvider from "../context/web3Context"

export const getLibrary = (provider: any) => {
  return new Web3(provider)
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Web3ReactProvider getLibrary={getLibrary}>
        <WalletConnectProvider>
          <Component {...pageProps} />
        </WalletConnectProvider>
      </Web3ReactProvider>
    </>
  )
}
