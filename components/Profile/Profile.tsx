import Image from "next/image"
import Link from "next/link";
import css from "./Profile.module.css"
import { User } from "@/types/user";

interface ProfileProps{
  user: User,
}

export default async function Profile({user}:ProfileProps) {
    return <main className={css.mainContent}>
  <div className={css.profileCard}>
      <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          
	     <Link  href="/profile/edit" className={css.editProfileButton}>
	       Edit Profile
	     </Link>
	   </div>
     <div className={css.avatarWrapper}>
      <Image
        src={user.avatar}
        alt="User Avatar"
        width={120}
        height={120}
        className={css.avatar}
      />
    </div>
    <div className={css.profileInfo}>
      <p>
        Username:{user.username}
      </p>
      <p>
        Email:{user.email}
      </p>
    </div>
  </div>
</main>
}