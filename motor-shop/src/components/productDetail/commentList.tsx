import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ptBr from 'dayjs/locale/pt-br';
import { useComments } from '@/contexts/commentContext';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getInitials } from '../utils';
import { FiEdit, FiDelete } from "react-icons/fi"
import { UserContext } from '@/contexts/userContext';
import { useModal } from '@/contexts/modalContext';
import Modal from '../modal/modal';
import UpdateUserForm from '../forms/updateUserForm';
import EditCommentForm from '../forms/editCommentForm';

export const CommentList = () => {
  const router = useRouter()
  const carId = router.query.productId
  const { getAllComments, comments, deleteComment } = useComments()
  const { currUser } = useContext(UserContext)
  const { stateModalProduct, showProductModal } = useModal()
  dayjs.extend(relativeTime);

  useEffect(() => {
    async function fetchData () {
      try {
        if (typeof carId === "string") {
          await getAllComments(carId)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [comments])

  return (
    <>
      {stateModalProduct && <Modal/>}
      <div className="py-9 px-11 rounded-[4px] mb-8 bg-grey-whiteFixed">
        <h2 className="heading-6-600 mb-5">Comentários</h2>
        <ul className="comment-list flex flex-col gap-5 max-h-[400px] overflow-y-auto mr-[-10px]">
          {comments && comments.length > 0 ? (
            comments.map((comment) => (
              <li key={comment.id} className='flex justify-between sm:items-center flex-col sm:flex-row'>
                <div>
                  <div className="flex gap-5 items-center">
                    <div className="bg-random-1 w-8 h-8 flex items-center justify-center rounded-full text-grey-whiteFixed body-2-500 font-inter">
                      {getInitials(comment.user.name)}
                    </div>
                    <p className="body-2-500 font-inter">{comment.user.name}</p>
                    <p className="text-grey-4">•</p>
                    <p className="text-grey-3 body-2-400">
                      {dayjs(comment.updated_at).locale(ptBr).fromNow()}
                    </p>
                  </div>
                  <p className="text-grey-2 body-2-400 text-justify mt-4 mr-2">
                    {comment.content}
                  </p>
                </div>
                {
                  comment.user_id == currUser?.id &&
                    <div className='flex gap-2 justify-end sm:items-center'>
                      <button
                        onClick={() => showProductModal(<EditCommentForm
                            content={comment.content}
                            commentId={comment.id}
                          />, "Editar comentário")}
                        className='btn-medium btn-brand-outline-brand1'
                      >
                        <FiEdit/>
                      </button>
                      <button
                        onClick={() => deleteComment(comment.id)}
                        className='btn-medium btn-outline1'
                      >
                        <FiDelete/>
                      </button>
                    </div>
                }
              </li>
            ))
          ) : (
            <p className="self-center heading-7-500 text-grey-3 bg-grey-7 rounded-full w-fit py-1 px-4 overflow-hidden">
              Ainda não há comentários sobre esse produto
            </p>
          )}
        </ul>
      </div>
    </>
  );
};
