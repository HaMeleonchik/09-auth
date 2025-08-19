import NoteForm from "@/components/NoteForm/NoteForm"
import css from "./CreateNote.module.css"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CreateNote",
  description: "Page for creating notes",
  openGraph: {
  title: "CreateNote",
  description: "Page for creating notes",
    url: "http://localhost:3000/notes/action/create",
    images: [{
      url:"https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      width: 1200,
      height: 630,
      alt: "NoteHub Image",
    }]
  }
};



export default function CreateNote() {
    return <main className={css.main}>
  <div className={css.container}>
    <h1 className={css.title}>Create note</h1>
        <NoteForm/>
  </div>
</main>

}
