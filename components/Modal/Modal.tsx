'use client'
import css from "./Modal.module.css"
import { createPortal } from "react-dom";
import { useEffect } from "react";
import type { ReactNode } from "react";
interface ModalProps{
  onClose: () => void
  children: ReactNode;
}
export default function Modal({ onClose, children}: ModalProps) {

// Escape and fix
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
      onClose()
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow ="hidden"
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [onClose])

  // handleBackdropClick
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if(event.target === event.currentTarget) {
      onClose()
    }
  }


    return createPortal(<div
  className={css.backdrop}
  role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
>
      <div className={css.modal}>
        {children}
  </div>
</div>, document.body)

}