import { useState } from "react"

export function useModal() {
  const [state, setState] = useState({
    isOpen: false,
    view: "WALLET_CONNECT_VIEW",
  })

  const openModal = (view: "WALLET_CONNECT_VIEW") =>
    setState({ ...state, isOpen: true, view })
  const closeModal = () => setState({ ...state, isOpen: false })

  return {
    ...state,
    openModal,
    closeModal,
  }
}
