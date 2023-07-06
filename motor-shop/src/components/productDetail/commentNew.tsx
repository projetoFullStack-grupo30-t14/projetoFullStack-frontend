import { useAuth } from '@/contexts/authContext';
import { UserContext } from '@/contexts/userContext';
import { useContext, useState } from 'react';
import { getInitials } from '../utils';
import { useForm } from 'react-hook-form';
import { commentRequestSchema, commentRequestType } from '@/schemas/comment.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field } from '../Input';
import { useComments } from '@/contexts/commentContext';
import { useRouter } from 'next/router';

export const NewComment = () => {
  const router = useRouter()
  const [inputValue, setInputValue] = useState('');
  const  { createComment, getAllComments } = useComments()
  const { currUser } = useContext(UserContext)
  const { token } = useAuth()
  const carId = router.query.productId

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset
  } = useForm<commentRequestType>({
    resolver: zodResolver(commentRequestSchema),
    mode: "onBlur"
  })

  function onSubmit(data: commentRequestType) {
    if (typeof carId === "string"){
      createComment(carId, data)
      reset()
    }
  }

  return (
    <>
      {
        token !== undefined ?
          <div className="py-9 px-11 bg-slate-100 rounded-[4px] bg-grey-whiteFixed">
            <div className="flex gap-5 items-center mb-4">
              <div className="bg-random-1 w-8 h-8 flex items-center justify-center rounded-full text-grey-whiteFixed body-2-500 font-inter">
                {getInitials(currUser?.name)}
              </div>
              <p className="body-2-500">{currUser?.name}</p>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)} 
              className="relative"
            >
              <Field
                id='comment'
                register={register("content")}
                textarea={true}
                type='text'
                placeholder='Digite aqui seu comentário'
                label=''
                onChange={(e) => setValue("content", e.target.value)}
                className='w-full h-32 resize-none px-7 py-8 rounded-[4px] border-solid border-2 border-grey-7 text-gray-7 transition ease-in-out delay-300 outline-none focus:border-brand-1'
              />
              <button
                type='submit'
                className="mb-7 btn-medium bg-brand-1 text-grey-whiteFixed rounded p-5 font-semibold absolute bottom-5 right-4 transition ease-in-out delay-300 hover:bg-brand-2"
              >
                Comentar
              </button>
            </form>
            <div className="space-y-2">
              <button
                type='button'
                className="bg-grey-7 textarea text-grey-3 rounded-full h-7 px-3 font-medium mr-4"
                onClick={() => setValue('content', "Gostei muito!")}
              >
                Gostei muito!
              </button>
              <button
                type='button'
                className="bg-grey-7 text-grey-3 rounded-full h-7 px-3 font-medium mr-4"
                onClick={() => setValue('content', "Incrível!")}
              >
                Incrível!
              </button>
              <button
                type='button'
                className="bg-grey-7 text-grey-3 rounded-full h-7 px-3 font-medium mr-4"
                onClick={() =>
                  setValue('content', "Recomendarei para os meus amigos!")
                }
              >
                Recomendarei para meus amigos!
              </button>
            </div>
          </div>
          :
          <div className="py-9 px-11 bg-slate-100 rounded-[4px] bg-grey-whiteFixed">
            <form className="relative">
              <textarea
                disabled
                id="comment"
                placeholder="Faça seu login para deixar um comentário"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full h-32 resize-none px-7 py-8 rounded-[4px] border-solid border-2 border-grey-7 placeholder:text-grey-3 text-gray-7 transition ease-in-out delay-300 outline-none focus:border-grey-3"
              />
              <button disabled className="btn-medium bg-brand-1 text-grey-whiteFixed rounded p-5 font-semibold absolute bottom-5 right-4 transition ease-in-out delay-300 hover:bg-brand-2">
                Comentar
              </button>
            </form>
          </div>
      }
    </>
  );
};
