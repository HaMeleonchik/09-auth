'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import css from "./NoteForm.module.css"
import { createNote } from "../../lib/api"
import type { NewNote } from "../../types/note"
import { useRouter } from "next/navigation"
import { useNoteDraft } from "@/lib/store/noteStore"
import { ChangeEvent } from "react"

export default function NoteForm() { 


const {draft, setDraft, clearDraft} = useNoteDraft()

  const queryClient = useQueryClient();

  const router = useRouter()

  const {mutate, isPending} = useMutation({
    mutationFn: (taskData: NewNote) => createNote(taskData),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["notes"] })
      router.push("/notes/filter/All")
      clearDraft()
    }
})

  interface NoteValues {
    title: string,
    content: string,
    tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping",
  }
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setDraft({
      ...(draft as NoteValues),
       [e.target.name as keyof NoteValues]: e.target.value,
    })
  }
  
  const handleSubmit = (formData: FormData) => {
    const values: NoteValues ={
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tag: formData.get("tag") as "Todo" | "Work" | "Personal" | "Meeting" | "Shopping",
    }
    if (!values.title.trim() || !values.content.trim()) {
      alert("Please fill in all fields.")
      return
    }
    mutate(values)
  }
  

  const CancelhandleClick = () => {
  router.back()
}
  
  
  return <form className={css.form} action={handleSubmit}>
  <div className={css.formGroup}>
    <label htmlFor="title">Title</label>
    <input  id="title" type="text" name="title" className={css.input} onChange={handleChange} defaultValue={draft.title}/>
  </div>

  <div className={css.formGroup}>
    <label htmlFor="content">Content</label>
      <textarea
      id="content"
      name="content"
      rows={8}
        className={css.textarea}
        onChange={handleChange}
        defaultValue={draft.content}
    />
  </div>

  <div className={css.formGroup}>
    <label htmlFor="tag">Tag</label>
    <select id="tag" name="tag" className={css.select} onChange={handleChange}  defaultValue={draft.tag}>
      <option value="Todo">Todo</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Meeting">Meeting</option>
      <option value="Shopping">Shopping</option>
    </select>
  </div>

  <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={CancelhandleClick}>
      Cancel
    </button>
    <button
      type="submit"
      className={css.submitButton}
      disabled={isPending}
    >
      {isPending ? "Creating...": "Create note"}
    </button>
  </div>
</form>
}