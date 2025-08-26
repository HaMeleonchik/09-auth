'use client'
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"
interface Props{
    children: React.ReactNode,
}
export default function NotesLayout({ children }: Props) {
    const router = useRouter()
    
    useEffect(() => {
    router.refresh()
},[router])

    return (
        <div>
            {children}
        </div>
    )
}