import { useContext } from "react"
import { Menu, Transition } from "@headlessui/react"
import { useModal } from "../context/useModal"
import Button from "./button"
import { WalletConnectContext } from "../context/web3Context"

export default function WalletConnect() {
  const { openModal } = useModal()

  const {
    showBalance,
    balance,
    connectLoginAndWallet,
    active,
    Network,
    account,
    user,
    handleLogout,
  } = useContext(WalletConnectContext)
  return (
    <>
      {account && active ? (
        <div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
          <div className="relative">
            <Menu>
              <Menu.Button className="block h-10 w-10 overflow-hidden rounded-full border-3 border-solid border-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-main transition-all hover:-translate-y-0.5 hover:shadow-large dark:border-gray-700 sm:h-12 sm:w-12"></Menu.Button>
              <Transition
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in duration-300"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-4"
              >
                <Menu.Items className="absolute -right-20 mt-3 w-72 origin-top-right rounded-lg bg-white shadow-large dark:bg-gray-900 sm:-right-14">
                  <Menu.Item>
                    <div className="border-b border-dashed border-gray-200 p-3 dark:border-gray-700">
                      <div className="flex items-center gap-3 rounded-lg py-2.5 px-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800">
                        <span className="h-8 w-8 rounded-full border-2 border-solid border-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:border-gray-700"></span>
                        {/* <span className="grow uppercase">{user}</span> */}
                        {/* <ChevronForward /> */}
                      </div>
                    </div>
                  </Menu.Item>
                  <Menu.Item>
                    <Menu.Item>
                      <div className="border-b border-dashed border-gray-200 px-6 py-5 dark:border-gray-700">
                        <div className="mt-3 font-medium uppercase tracking-wider text-gray-900 dark:text-white">
                          {Network}
                        </div>
                      </div>
                    </Menu.Item>
                  </Menu.Item>
                  <Menu.Item>
                    {showBalance && (
                      <Menu.Item>
                        <div className="border-b border-dashed border-gray-200 px-6 py-5 dark:border-gray-700">
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-sm font-medium -tracking-tighter text-gray-600 dark:text-gray-400">
                              Balance
                            </span>
                            <span className="rounded-lg bg-gray-100 px-2 py-1 text-sm tracking-tighter dark:bg-gray-800">
                              {account.slice(0, 6)}
                              {"..."}
                              {account.slice(account.length - 6)}
                            </span>
                          </div>
                          <div className="mt-3 font-medium uppercase tracking-wider text-gray-900 dark:text-white">
                            {balance} MATIC
                          </div>
                        </div>
                      </Menu.Item>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    <div className="p-3">
                      <div
                        className="flex cursor-pointer items-center gap-3 rounded-lg py-2.5 px-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800"
                        onClick={handleLogout}
                      >
                        {/* <PowerIcon /> */}
                        <span className="grow uppercase">Logout</span>
                      </div>
                    </div>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>

          {/* <ActiveLink href="/create-nft">
            <Button className="shadow-main hover:shadow-large">CREATE</Button>
          </ActiveLink> */}
        </div>
      ) : (
        <Button
          onClick={() => connectLoginAndWallet()}
          className="shadow-main hover:shadow-large bg-gray-500"
        >
          CONNECT
        </Button>
      )}
    </>
  )
}
