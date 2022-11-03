import React, { createContext, useEffect, ReactNode, useState } from "react"
import { useWeb3React } from "@web3-react/core"
import { useRouter } from "next/router"
import { connectors } from "../utils/connectors"

export interface IWalletConnectContext {
  getNetWorkName?: any
  connectLoginAndWallet?: any
  showBalance?: any
  connectedWallet?: any
  sidebarOpen?: any
  user?: IUser | null
  noti?: any
  balance?: any
  setNoti?: any
  setSidebarOpen?: any
  active?: any
  account?: any
  handleLogout?: any
  Network?: any
  loading: boolean
}
interface IUser {
  profileImage: string
  email: string
  name: string
  balance: number
  address: string
}
type Props = {
  children: ReactNode
}

export const WalletConnectContext = createContext<IWalletConnectContext>({
  loading: true,
})

const WalletConnectProvider = ({ children }: Props) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [connectedWallet, setConnectedWallet] = useState(true)
  const [noti, setNoti] = useState({ type: "", text: "", show: false })
  const [showBalance, setShowBalance] = useState(true)
  const [balance, setBalance] = useState<string | number>("")
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { active, account, chainId, library, activate, deactivate } =
    useWeb3React()

  const handleLogout = () => {
    deactivate()
  }

  useEffect(() => {}, [])

  useEffect(() => {
    if (library) {
      const network = [137, 80001]

      if (!network.includes(chainId)) {
        setNoti({
          type: "warning",
          show: true,
          text: "Please switch to Polygon or Mumbai Testnet!",
        })
        setShowBalance(false)
      } else {
        setShowBalance(true)
        library.eth
          .getBalance(account)
          .then((res: any) => setBalance(res / 1e18))
      }
    }
  }, [library, account, chainId])

  function getNetWorkName(chainidNum: any) {
    const network: any = {
      1: "Etherum Mainnet ",
      137: "Polygon Network",
      80001: "Mumbai Testnet",
    }
    return network[chainidNum]
  }

  useEffect(() => {}, [account, active])

  const onError = (err) => {
    alert(err)
  }

  const connectLoginAndWallet = async () => {
    try {
      await activate(connectors.injected, onError)
    } catch (error) {}
  }
  console.log(active)
  return (
    <WalletConnectContext.Provider
      value={{
        getNetWorkName,
        connectLoginAndWallet,
        showBalance,
        connectedWallet,
        user,
        noti,
        balance,
        account,
        setNoti,
        active,
        handleLogout,
        loading,
        Network: active && chainId && getNetWorkName(chainId),
      }}
    >
      {children}
    </WalletConnectContext.Provider>
  )
}

export default WalletConnectProvider
