import { useCars } from "@/contexts/carContext";
import { useModal } from "@/contexts/modalContext";

interface ConfirmAdDeleteProps {
  id: string;
}

export const ConfirmAdDelete = ({ id }: ConfirmAdDeleteProps) => {
  const { closeModal } = useModal();
  const { deleteOneCar } = useCars();
  function deleteCar() {
    deleteOneCar(id);
    closeModal();
  }

  return (
    <div className="flex flex-col gap-5 mt-10 max-w-lg">
      <p className="heading-7-500 font-lexend">
        Tem certeza que deseja remover esse anúncio?
      </p>
      <p className="body-1-400 font-inter">
        Essa ação não pode ser desfeita. Isso excluirá permanentemente esse
        anúncio e removerá os dados de nossos servidores.
      </p>
      <div className="flex flex-col sm:flex-row justify-end gap-2 min-w-max">
        <button
          type="button"
          onClick={closeModal}
          className="btn-big btn-negative transition ease-in-out"
        >
          Cancelar
        </button>
        <button
          className="btn-big btn-alert transition ease-in-out"
          onClick={() => deleteCar()}
        >
          Sim, excluir anúncio
        </button>
      </div>
    </div>
  );
};
