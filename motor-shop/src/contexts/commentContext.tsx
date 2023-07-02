import { CommentType, commentRequestType } from "@/schemas/comment.schema";
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
    createComment: (car_id: string, commentData: commentRequestType) => Promise<CommentType | undefined>
    getAllComments: (car_id: string) => Promise<CommentType[] | undefined>
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

    async function createComment (car_id: string, commentData: commentRequestType) {
        try {
            const newComment: CommentType = (await api.post(`comments/${car_id}`, commentData, headers)).data
            toast.success("Obrigado por deixar seu comentário")
            return newComment
        } catch (error) {
            if (error instanceof AxiosError){
                toast.error(`${error.response?.data.message}`)
                console.log(error)
            } else {
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
                console.log(error)
            }
        }
    }

    return (
        <CommentContext.Provider
            value={{
                comments,
                createComment,
                getAllComments
            }}
        >
            {children}
        </CommentContext.Provider>
    )
}

export const useComments = () => useContext(CommentContext)