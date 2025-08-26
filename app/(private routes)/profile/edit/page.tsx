"use client"
import Image from "next/image"
import css from "./EditProfilePage.module.css"
import { getMe, updateUserProfile } from "@/lib/api/clientApi"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store/authStore"
export default function EditProfilePage() {
  const [UserName, setUserName] = useState("")
  const [UserEmail, setUserEmail] = useState("")
  const [UserAvatar, setUserAvatar] = useState("")
  const{setUser}= useAuthStore()
  const router = useRouter()

useEffect(() => {
    getMe().then((user) => {
      setUserName(user.username ?? '');
      setUserEmail(user.email ?? '');
      setUserAvatar(user.avatar ?? '');
    });
  }, []);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };
  
  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (UserName.length === 0) {
      alert("type Name")
      return
    }
    
    const data = await updateUserProfile({ email: UserEmail, username: UserName })
    if (data) {
    setUser(data)
      router.push("/profile")
    }
    
  }
  
  
  const handleCancelClick = () => {
      router.back()
  }
    
    return <>
<main className={css.mainContent}>
  <div className={css.profileCard}>
    <h1 className={css.formTitle}>Edit Profile</h1>

    <Image src={UserAvatar || "https://ac.goit.global/fullstack/react/default-avatar.jpg"}
      alt="User Avatar"
      width={120}
      height={120}
      className={css.avatar}
      priority
    />

    <form className={css.profileInfo} onSubmit={handleSave}>
      <div className={css.usernameWrapper}>
        <label htmlFor="username">Username: { UserName}</label>
        <input id="username"
        type="text"
        value={UserName}
        onChange={handleChange}
        className={css.input}
        />
      </div>

            <p>Email: { UserEmail}</p>

      <div className={css.actions}>
        <button type="submit" className={css.saveButton}>
          Save
        </button>
        <button type="button" className={css.cancelButton} onClick={handleCancelClick}>
          Cancel
        </button>
      </div>
    </form>
  </div>
</main>

    </>
}

