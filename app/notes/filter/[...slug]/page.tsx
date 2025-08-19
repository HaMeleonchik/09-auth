import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

interface Props{
  params: Promise<{ slug: string[] }>
}

export async function generateMetadata({ params }: Props):Promise<Metadata> {
  const { slug } = await params
  
const filterNot = slug[0]
const tag = filterNot === "All" ? undefined : filterNot

  const tagForUrl = tag ?? "All"

  return {
    title: `filter: ${tagForUrl}`,
    description: `Notes by tag: ${tagForUrl}`,
      openGraph: {
    title: `filter: ${tagForUrl}`,
    description: `Notes by tag: ${tagForUrl}`,
    url: `/notes/filter/${tagForUrl}`,
    images: [{
      url:"https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      width: 1200,
      height: 630,
      alt: "NoteHub Tag Image",
    }]
  }
}

 }

export default async function Notes({params}:Props) {
  const { slug } = await params
  
const filterNot = slug[0]
const tag = filterNot === "All" ? undefined : filterNot

  const page = 1
  const searchQuery = ""
  
  const initialData = await fetchNotes(searchQuery, tag, page)

  return <NotesClient
    initialNotes={initialData.notes}
    initialTotalPages={ initialData.totalPages}
    tag={tag}
  />

}