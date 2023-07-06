import { useModal } from "@/contexts/modalContext";
import { useEffect } from "react";

export default function Modal() {
  const { closeModal, closeCommentModal, childrenModal, modalTitle } =
    useModal();

  useEffect(() => {
    function closeMenuEvent(e: any) {
      if (e.key === "Esc" || e.key === "Escape") {
        closeModal();
        closeCommentModal();
      }
    }
    window.addEventListener("keydown", closeMenuEvent);
  }, []);

  function closeModals() {
    closeModal();
    closeCommentModal();
  }

  return (
    <>
      <div className="fixed inset-0 bg-grey-0 bg-opacity-50 flex justify-center items-center z-20" />
      <div className="flex justify-center">
        <div className="max-h-max sm:min-w-max p-5 rounded-lg bg-grey-whiteFixed absolute z-30 mt-20">
          <div className="flex items-center justify-between mb-4">
            <p className="font-lexend heading-7-600 text-grey-1">
              {modalTitle}
            </p>
            <img
              onClick={() => closeModals()}
              className="cursor-pointer"
              src="/close.png"
              alt="a close button"
            />
          </div>
          {childrenModal}
        </div>
      </div>
    </>
  );
}
