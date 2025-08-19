import NotFound from "@/app/not-found"
import { fetchNoteById } from "../../../lib/api"
import NoteDetailsClient from "./NoteDetails.client"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { Metadata } from "next"
interface Props {
    params:Promise<{id:string}>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  
  const { id } = await params
  const note = await fetchNoteById(id)
  
  return {
    title: `Note: ${note.title}`,
    description: note.content.slice(0, 30),
      openGraph: {
    title: `Note: ${note.title}`,
    description: note.content.slice(0, 30),
    url: `/notes/${id}`,
    images: [{
      url:"https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      width: 1200,
      height: 630,
      alt: "NoteHub Id Image",
    }]
  }
}

 }



export default async function NoteDetails({ params}: Props) {
  const { id } = await params
    
    const note = await fetchNoteById(id).catch(() => {
        NotFound();
    });

    if (!note) {
        NotFound();
  }
  
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  })
  

  return<HydrationBoundary state={dehydrate(queryClient)}>
    <NoteDetailsClient id={ id} />
        </HydrationBoundary>
} 