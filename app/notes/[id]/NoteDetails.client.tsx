"use client"
import { fetchNoteById } from "../../../lib/api"
import css from "./NoteDetails.module.css"
import { useQuery } from "@tanstack/react-query"
import style from "../../../components/loaderErrorCss/loaderErrorCss.module.css"

interface NoteDetailsClientProps{
    id: string;
}
export default function NoteDetailsClient({id}:NoteDetailsClientProps) {
    

 const {data:note, isLoading, isError} = useQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount:false,
 })    
    return <div className={css.container}>
	<div className={css.item}>
	  <div className={css.header}>
        <h2>{ note?.title}</h2>
	  </div>
    <p className={css.content}>{ note?.content}</p>
	  <p className={css.date}>{ note?.updatedAt}</p>
        </div>
    {isLoading && <p className={style.loadingText}>Loading, please wait...</p> }
    {isError && !note && <p className={style.errorText}>Something went wrong.</p>}
    </div>

} 
