import { CommentType, commentRequestType, commentUpdateType } from "@/schemas/comment.schema";
import { api } from "@/services";
import { AxiosError } from "axios";
import { createContext, useState, useContext } from "react";
import { toast } from "react-toastify";
import { useAuth } from "./authContext";

interface iCommentProviderProps {
    children: React.ReactNode;
}

interface iCommentContextProps {
    comments: CommentType[]
    createComment: (car_id: string, comment_data: commentRequestType) => Promise<CommentType | undefined>
    updateComment: (comment_id: string, comment_data: commentUpdateType) => Promise<void>
    getAllComments: (car_id: string) => Promise<CommentType[] | undefined>
    deleteComment: (comment_id: string) => Promise<void>
}

export const CommentContext = createContext({} as iCommentContextProps)

export default function CommentProvider ({ children }: iCommentProviderProps){
    const [comments, setComments] = useState<CommentType[] | []>([])
    const { token } = useAuth()

    const headers = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    async function createComment (car_id: string, comment_data: commentRequestType) {
        try {
            const newComment: CommentType = (await api.post(`comments/${car_id}`, comment_data, headers)).data
            toast.success("Obrigado por deixar seu comentário")
            return newComment
        } catch (error) {
            if (error instanceof AxiosError){
                toast.error(`${error.response?.data.message}`)
                console.log(error)
            } else {
                toast.error("Erro desconhecido, procure a equipe de suporte")
                console.log(error)
            }
        }
    }

    async function getAllComments (car_id: string) {
        try {
            const allComments: Array<CommentType> = (
                await api.get(`comments/car/${car_id}`)
            ).data
            setComments(allComments)
            return allComments
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(`${error.response?.data.message}`)
                console.log(error)
            } else {
                toast.error("Erro desconhecido, procure a equipe de suporte")
                console.log(error)
            }
        }
    }

    async function updateComment (comment_id: string, comment_data: commentUpdateType) {
        try {
            await api.patch(`comments/${comment_id}`, comment_data, headers)
            toast.success("Comentário editado com sucesso")
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(`${error.response?.data.message}`)
                console.log(error)
            } else {
                toast.error("Erro desconhecido, procure a equipe de suporte")
                console.log(error)
            }
        }
    }

    async function deleteComment (comment_id: string) {
        try {
            await api.delete(`comments/${comment_id}`, headers)
            toast.success("Comentário deletado com sucesso")
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(`${error.response?.data.message}`)
                console.log(error)
            } else {
                toast.error("Erro desconhecido, procure a equipe de suporte")
                console.log(error)
            }
        }
    }

    return (
        <CommentContext.Provider
            value={{
                comments,
                createComment,
                updateComment,
                getAllComments,
                deleteComment,
            }}
        >
            {children}
        </CommentContext.Provider>
    )
}

export const useComments = () => useContext(CommentContext)