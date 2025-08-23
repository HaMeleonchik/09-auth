'use client'
import css from "./notes.module.css"
import style from "@//components/loaderErrorCss/loaderErrorCss.module.css"
import NoteList from "@//components/NoteList/NoteList"
import { fetchNotes } from "@/lib/api/clientApi"
import SearchBox from "@//components/SearchBox/SearchBox";
import Pagination from "@//components/Pagination/Pagination";
import { useQuery, keepPreviousData} from '@tanstack/react-query';
import { useDebounce } from "use-debounce";
import { useState } from "react";
import { Note } from "@/types/note"
import Link from "next/link"
interface DataProps{
  initialNotes: Note[];
  initialTotalPages: number;
  tag:string | undefined,
}

interface NoteResponse{
  notes: Note[], 
  totalPages:number,
}

export default function NotesClient({initialNotes, initialTotalPages, tag}:DataProps) {
  const [query, setQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const [debouncedSearchQuery] = useDebounce(query, 300)

  const { data, isLoading, isError } = useQuery<NoteResponse>({
    queryKey: ["notes", debouncedSearchQuery, tag,  currentPage],
    queryFn: () => fetchNotes(debouncedSearchQuery, tag,  currentPage),
    placeholderData: keepPreviousData,
    initialData: {
      notes: initialNotes,
      totalPages: initialTotalPages,
    }
  })
  
  
  const updateSearchQuery = (newSearchQuery: string) => {
      setQuery(newSearchQuery)
      setCurrentPage(1)
    }

  const totalPages = data?.totalPages ?? 0;
  
const TagAllOrUndefined = tag === undefined || tag ==="All" 
const showNotes =( TagAllOrUndefined || tag !== undefined && !isLoading && data?.notes && data?.notes.length > 0)

  return <div className={css.app}>
	<header className={css.toolbar}>
      <SearchBox value={query} onSearch = { updateSearchQuery} />
      {totalPages > 1 && <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />}
      <Link className={css.button} href={"/notes/action/create"}>Create note +</Link>
    </header>
    {showNotes ? <NoteList notes={data?.notes} /> : <p className={style.errorText}>No notes or tags</p>}
    {isLoading && <p className={style.loadingText}>Loading notes, please wait...</p>}
    {isError && <p className={style.errorText}>There was an error, please try again...</p>}
  </div>

}