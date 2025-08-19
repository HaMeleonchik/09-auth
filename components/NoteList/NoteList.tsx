'use client'
import css from "./NoteList.module.css"
import type { Note } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../lib/api";
import Link from "next/link"
interface NoteListProps{
notes:Note[]
}
export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: (taskId:string) => deleteNote(taskId),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["notes"] })
    }
})

    return <ul className={css.list}>
  {notes.map(notes => <li className={css.listItem} key={notes.id}>
    <h2 className={css.title}>{ notes.title}</h2>
    <p className={css.content}>{ notes.content}</p>
    <div className={css.footer}>
      <span className={css.tag}>{notes.tag}</span>
      <Link href={`/notes/${notes.id}`}>View details</Link>
      <button className={css.button} onClick={() => mutation.mutate(notes.id)}>Delete</button>
    </div>
  </li>)}
</ul>

}