"use client"
import Link from "next/link"
import css from "./AuthNavigation.module.css"
import { useAuthStore } from "@/lib/store/authStore"
import { useRouter } from "next/navigation"
import { logout } from "@/lib/api/clientApi"

export default function AuthNavigation() {
  const { isAuthenticated } = useAuthStore()
    const router = useRouter()
    const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated)
  const handleClick = async () => {
    await logout()
    clearIsAuthenticated()
    router.push("/sign-in")
}
  
  return <>
    {isAuthenticated ? <>
    <li className={css.navigationItem}>
  <Link href="/profile" prefetch={false} className={css.navigationLink}>
    Profile
  </Link>
</li>
      
<li className={css.navigationItem}>
  <p className={css.userEmail}>User email</p>
  <button className={css.logoutButton} onClick={handleClick}>
    Logout
  </button>
</li>
  </>  
    :
      <>
      <li className={css.navigationItem}>
  <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
    Login
  </Link>
</li>

<li className={css.navigationItem}>
  <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
    Sign up
  </Link>
 </li>
        </>
}
    </>
}