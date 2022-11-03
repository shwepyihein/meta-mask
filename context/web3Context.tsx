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
    localStorage.removeItem("wallet")
  }

  useEffect(() => {
    const wallet = localStorage.getItem("wallet")
    if (wallet) {
      connectLoginAndWallet()
    }
  }, [])

  useEffect(() => {
    if (library) {
      const network = [
        1, 3, 4, 5, 42, 137, 80001, 43114, 43113, 1088, 588, 1313161554,
        1313161555, 56, 97, 250, 4002,
      ]

      if (!network.includes(chainId)) {
        setNoti({
          type: "warning",
          show: true,
          text: "Please switch to other  Testnet!",
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
      3: "Ropsten Test Network",
      4: "Rinkeby Test Network",
      5: "Goerli Test Network",
      42: "Kovan Test Network",
      137: "Polygon Network",
      80001: "Mumbai Testnet",
      43114: "Avalanche C-Chain Main Network",
      43113: "Fuji Test Network",
      1088: "Metis Andromeda Main Network",
      588: "Metis Stardust Test Network",
      1313161554: "Aurora Main Network",
      1313161555: "Aurora Test Network",
      56: "Binance Smart Chain Main Network",
      97: "Binance Smart Chain Test Network",
      250: "	Fantom Opera Main Network",
      4002: "Fantom Test Network",
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
      localStorage.setItem("wallet", true)
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
