import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useStore } from "@/hooks/useStore"
import LOCAL_ENDPOINT from "@/config/localEndpoint"

const useCheckAuthrizate = () => {
  const { globalStore } = useStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (globalStore.checkToken) {
      globalStore.getUserInfo()
    } else {
      globalStore.handleLogout()
      navigate(LOCAL_ENDPOINT.AUTH)
    }
  }, [globalStore.isAuthorizate])
}

export default useCheckAuthrizate