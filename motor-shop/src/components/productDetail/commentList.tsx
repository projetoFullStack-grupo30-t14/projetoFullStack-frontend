import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ptBr from "dayjs/locale/pt-br";
import { useComments } from "@/contexts/commentContext";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getInitials } from "../utils";
import { FiEdit, FiDelete } from "react-icons/fi";
import { useModal } from "@/contexts/modalContext";
import Modal from "../modal/modal";
import EditCommentForm from "../forms/editCommentForm";
import { UserContext } from "@/contexts/userContext";

export const CommentList = () => {
  const router = useRouter();
  const carId = router.query.productId;
  const { getAllComments, comments, deleteComment } = useComments();
  const { currUser } = useContext(UserContext);
  const { stateModalComment, showCommentModal } = useModal();
  dayjs.extend(relativeTime);

  const [difference, setDifference] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      if (typeof carId === "string") {
        await getAllComments(carId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    if (comments.length > 0 && difference == 0) {
      const created = new Date(comments[0].created_at);
      const updated = new Date(comments[0].updatedAt);
      const dif = Math.abs(updated.valueOf() - created.valueOf());
      setDifference(Math.floor(dif / 1000 / 60));

      setLoading(false);
    }
  }, [comments]);

  return (
    <>
      {stateModalComment && <Modal />}
      <div className="py-9 px-11 rounded-[4px] mb-6 bg-grey-whiteFixed">
        <h2 className="heading-6-600 mb-5">Comentários</h2>
        <ul className="comment-list flex flex-col gap-5 max-h-[400px] overflow-y-auto mr-[-10px]">
          {comments && comments.length > 0 ? (
            comments.map((comment) => (
              <li
                key={comment.id}
                className="flex justify-between sm:items-center flex-col sm:flex-row"
              >
                <div>
                  <div className="flex gap-5 items-center">
                    <div className="bg-random-1 w-8 h-8 flex items-center justify-center rounded-full text-grey-whiteFixed body-2-500 font-inter">
                      {getInitials(comment.user.name)}
                    </div>
                    <p className="body-2-500 font-inter">{comment.user.name}</p>
                    <p className="text-grey-4">•</p>
                    <p className="text-grey-3 body-2-400">
                      {!loading
                        ? comments && difference < 1
                          ? `${dayjs(comment.created_at)
                              .locale(ptBr)
                              .fromNow()} `
                          : `${dayjs(comment.updatedAt).locale(ptBr).fromNow()}`
                        : ""}
                    </p>
                  </div>
                  <p className="text-grey-2 body-2-400 text-justify mt-4 mr-2">
                    {comment.content}
                  </p>
                </div>
                {comment.user_id == currUser?.id && (
                  <div className="flex gap-2 justify-end sm:items-center">
                    <button
                      onClick={() =>
                        showCommentModal(
                          <EditCommentForm
                            content={comment.content}
                            commentId={comment.id}
                            fetchData={fetchData}
                          />,
                          "Editar comentário"
                        )
                      }
                      className="btn-medium btn-brand-outline-brand1"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => deleteComment(comment.id)}
                      className="btn-medium btn-outline1"
                    >
                      <FiDelete />
                    </button>
                  </div>
                )}
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
