"use client"
import { isValidSession, getMe } from "@/lib/api/clientApi"
import { useAuthStore } from "@/lib/store/authStore"
import { useEffect } from "react"

interface Props{
    children:React.ReactNode
}

export default function AuthProvider({ children }: Props) {
    const setUser = useAuthStore((state)=>state.setUser)
const clearIsAuthenticated =  useAuthStore((state)=>state.clearIsAuthenticated)

    useEffect(() => {
        const fetchSession = async () => {

            const res = await isValidSession()
            
            if (res) {
                const user = await getMe()
                setUser(user)
            } else {
                clearIsAuthenticated()
            }
        }
        fetchSession()
    }, [clearIsAuthenticated, setUser])
    
    
    return children
}