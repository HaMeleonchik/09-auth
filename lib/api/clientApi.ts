import { checkSessionResponse, UpdateUserRequest, User } from "@/types/user"
import type { NewNote, Note } from "../../types/note";
import { nextServer } from "./api";


export interface NoteHttpResponse{
    notes: Note[], 
    totalPages: number,
    tag: string,
}

export interface AuthRequestData{
  email: string,
  password: string

}


export async function fetchNotes(searchQuery: string, tag?:string, page: number = 1): Promise<{notes: Note[],  totalPages:number, tag?:string,}> {
    const response = await nextServer.get<NoteHttpResponse>("/notes", {
        params: {
            ...(searchQuery.trim() && { search: searchQuery.trim() }),
            page,
            tag,
            perPage: 12,
        },
    }
    )
    return {
        notes: response.data.notes,
        totalPages: response.data.totalPages,
    }
}

export async function createNote(taskData: NewNote): Promise<Note> {
    const response = await nextServer.post<Note>("/notes", taskData)

    return response.data

}

export async function deleteNote(taskId: string):Promise<Note> {
const response = await nextServer.delete<Note>(`/notes/${taskId}`)
    return response.data
}


export async function fetchNoteById(noteId: string): Promise<Note> {
const response = await nextServer.get<Note>(`/notes/${noteId}`)
    return response.data
}


export async function login(body: AuthRequestData) {
const response = await nextServer.post<User>(`/auth/login`, body)
    return response.data
}

export async function register(body: AuthRequestData) {
const response = await nextServer.post<User>(`/auth/register`, body)
    return response.data
}

export async function checkSession() {
const response = await nextServer.get<checkSessionResponse>(`/auth/session`)
    return response.data.success
}

export async function getMe() {
const response = await nextServer.get<User>(`/users/me`)
    return response.data
}

export async function logout() {
const response = await nextServer.post(`/auth/logout`)
    return response.data
}


export async function getUpdateMe(body: UpdateUserRequest) {
const response = await nextServer.patch<User>(`/users/me`, body)
    return response.data
}
