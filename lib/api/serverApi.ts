import {User } from "@/types/user"
import { nextServer } from "./api"
import { cookies } from "next/headers"
import { Note } from "@/types/note"
import { NoteHttpResponse } from "./clientApi"
import { checkSessionResponse } from "@/types/common"

export async function checkServerSession() {
    const cookieData = await cookies()
    const response = await nextServer.get<checkSessionResponse>(`/auth/session`, {headers:{Cookie: cookieData.toString()}})
    return response
}

export async function fetchServerNotes(searchQuery: string, tag?: string, page: number = 1): Promise<{ notes: Note[], totalPages: number, tag?: string, }> {
    const cookieData = await cookies()
    const response = await nextServer.get<NoteHttpResponse>("/notes", {
        params: {
            ...(searchQuery.trim() && { search: searchQuery.trim() }),
            page,
            tag,
            perPage: 12,
        },
        headers:{Cookie: cookieData.toString()},
    }
    )
    return {
        notes: response.data.notes,
        totalPages: response.data.totalPages,
    }
}


export async function checkServerMe() {
    const cookieData = await cookies()
    const response = await nextServer.get<User>(`/users/me`, {headers:{Cookie: cookieData.toString()}})
    return response.data
}


export async function fetchServerNoteById(noteId: string): Promise<Note> {
    const cookieData = await cookies()
const response = await nextServer.get<Note>(`/notes/${noteId}`, {headers:{Cookie: cookieData.toString()}})
    return response.data
}