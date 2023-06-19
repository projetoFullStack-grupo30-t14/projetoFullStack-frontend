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
        <div className="absolute z-30 sm:right-1/3 mt-20 p-3 max-w-full">
          <div className="fixed inset-0 bg-grey-0 opacity-50" />
          <div className="max-h-max sm:min-w-max p-5 rounded-lg bg-grey-whiteFixed relative">
            <div className="flex items-center justify-between mb-4">
                <p className="font-lexend heading-7-600 text-grey-1">{modalTitle}</p>
                <img onClick={closeModal} className="cursor-pointer" src="/close.png" alt="a close button" />
            </div>
            {childrenModal}
          </div>
        </div>
      );
}
