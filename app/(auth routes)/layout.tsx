import React from "react"
interface Props{
    children: React.ReactNode,
}
export default function NotesLayout({ children}: Props) {
    return (
        <div>
            {children}
        </div>
    )
}