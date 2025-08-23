"use client"
import { AuthRequestData, register } from "@/lib/api/clientApi"
import css from "./SignUpPage.module.css"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useAuthStore } from "@/lib/store/authStore"

export default function SignUpPage() {
  
  const router = useRouter()
  const [error, setError] = useState('');
    const setUser = useAuthStore((state) => state.setUser)
    
  const handleRegister = async (formData: FormData) => {
  try {
    const data = Object.fromEntries(formData) as unknown as AuthRequestData
  const user = await register(data)
    
    if (user) {
      router.push("/profile")
      setUser(user)
 } else {
      setError("Invalid email or password")
    }

  } catch (error) {
      console.log(error);
   setError('Oops... some error')
  }
}
    return <main className={css.mainContent}>
  <h1 className={css.formTitle}>Sign up</h1>
	<form className={css.form} action={handleRegister}>
    <div className={css.formGroup}>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" name="email" className={css.input} required />
    </div>

    <div className={css.formGroup}>
      <label htmlFor="password">Password</label>
      <input id="password" type="password" name="password" className={css.input} required />
    </div>

    <div className={css.actions}>
      <button type="submit" className={css.submitButton}>
        Register
      </button>
    </div>

      {error && <p className={css.error}>{error}</p>}
  </form>
</main>

}