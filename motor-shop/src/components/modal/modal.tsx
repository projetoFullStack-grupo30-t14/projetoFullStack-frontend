import { useModal } from "@/contexts/modalContext";
import { useEffect } from "react";

export default function Modal () {
    const { closeModal, childrenModal, modalTitle } = useModal()

    useEffect(() => {
      function closeMenuEvent (e: any) {
          if (e.key === "Esc" || e.key === "Escape") {
              closeModal()
          }
      }
      window.addEventListener("keydown", closeMenuEvent)
  }, [])

    return (
        <div className="fixed z-30 inset-0 flex justify-center items-center">
          <div className="fixed inset-0 bg-grey-0 opacity-50" />
          <div className="w-full max-h-max sm:w-max p-5 rounded-lg bg-grey-whiteFixed relative -top-32">
            <div className="flex items-center justify-between mb-4">
                <p className="font-lexend heading-7-600 text-grey-1">{modalTitle}</p>
                <img onClick={closeModal} className="cursor-pointer" src="/close.png" alt="a close button" />
            </div>
            {childrenModal}
          </div>
        </div>
      );
}
