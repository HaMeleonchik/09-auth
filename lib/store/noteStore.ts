import { create } from "zustand";
import { persist } from "zustand/middleware";

  interface NoteValues {
    title: string,
    content: string,
    tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping",
  }

const initialDraft: NoteValues = {
title: '',
  content: '',
  tag: 'Todo',
}

interface NoteDraft{
    draft: NoteValues,
    setDraft: (NewNote: NoteValues) => void,
    clearDraft: () => void,
}
  
export const useNoteDraft = create<NoteDraft>()(persist((set) => {
    return {
        draft: initialDraft,
        setDraft:(NewNote: NoteValues) => set({draft: NewNote}),
        clearDraft:() => set({draft: initialDraft}),
    }
},
    {
    name: "draft"
    }
))