import { fetchNoteById } from "@/lib/api"
import NotePreview from "./NotePreview.client";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

interface Props {
    params:Promise<{id:string}>
}


export async function generateMetadata({ params }: Props) {

   const { id } = await params;
  const data = await fetchNoteById(id)
  
  return {
    title: `Note: ${data.title}`,
    description: data.content.slice(0, 30),
      openGraph: {
    title: `Note: ${data.title}`,
    description: data.content.slice(0, 30),
    url: `http://localhost:3000/notes/${id}`,
        images: [{
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub id Image",
      }],
    }
  }
}


export default async function previewPage({ params }: Props) {
    const { id } = await params;


    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  })
  
    return  <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview/>
    </HydrationBoundary>
}