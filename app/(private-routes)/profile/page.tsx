import Profile from "@/components/Profile/Profile";
import { checkServerMe } from "@/lib/api/serverApi";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "User Profile",
  openGraph: {
  title: "Profile",
  description: "User Profile",
    url: "http://localhost:3000/profile",
    images: [{
      url:"https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      width: 1200,
      height: 630,
      alt: "NoteHub Image",
    }]
  }
};

export default async function ProfilePage() {
    const User = await checkServerMe()

    return <Profile user={User} />
}

