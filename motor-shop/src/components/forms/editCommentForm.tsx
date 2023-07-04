import { commentUpdateSchema, commentUpdateType } from "@/schemas/comment.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Field } from "../Input"
import { useComments } from "@/contexts/commentContext"
import { useModal } from "@/contexts/modalContext"

interface UpdateCommentProps {
    commentId: string
    content: string
}

export default function EditCommentForm ({content, commentId}: UpdateCommentProps) {
    const { updateComment } = useComments()
    const { closeCommentModal } = useModal()
    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
    } = useForm<commentUpdateType>({
        resolver: zodResolver(commentUpdateSchema),
        mode: "onBlur"
    })

    function onSubmit(data: commentUpdateType) {
        updateComment(commentId, data)
        closeCommentModal()
    }
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-end"
        >
            <Field
            id='comment'
            register={register("content")}
            textarea={true}
            type='text'
            placeholder='Digite aqui seu comentário'
            label=''
            defaultValue={content}
            onChange={(e) => setValue("content", e.target.value)}
            className='w-96 h-32 resize-none px-7 py-8 rounded-[4px] border-solid border-2 border-grey-7 placeholder:text-grey-3 text-gray-7 transition ease-in-out delay-300 outline-none focus:border-grey-3'
            />
            <button
            type='submit'
            className="btn-medium bg-brand-1 text-grey-whiteFixed rounded p-5 font-semibold transition ease-in-out delay-300 hover:bg-brand-2"
            >
                Atualizar
            </button>
        </form>
    )
}