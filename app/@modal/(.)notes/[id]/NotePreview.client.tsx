"use client"
import { useRouter } from "next/navigation";
import Modal from "../../../../components/Modal/Modal"
import css from "./NotePreview.module.css"
import { useParams } from "next/navigation";
import { fetchNoteById } from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";
import style from "../../../../components/loaderErrorCss/loaderErrorCss.module.css"
import { Note } from "@/types/note";


export default function NotePreview({}: Record<string, never>) {

  const { id } = useParams<{ id: string }>();
    
 const {data:note, isLoading, isError} = useQuery<Note>({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount:false,
 })    

    const router = useRouter();

    const handleClose = () => {
    router.back()
    }


    return <Modal onClose={handleClose}>
        <div className={css.container}>
	<div className={css.item}>
    <div className={css.header}>
    <h2>{note?.title}</h2>
    <button className={css.backBtn} onClick={handleClose}>Close</button>
        </div>
    <p className={css.content}>{note?.content}</p>
    <p className={css.tag}>{ note?.tag}</p>
    <p className={css.date}>{note?.createdAt }</p>
        </div>
        </div>
    {isLoading && <p className={style.loadingText}>Loading, please wait...</p> }
    {isError && !note && <p className={style.errorText}>Something went wrong.</p>}
    </Modal>
}