import { AuthContext } from '@/contexts/authContext';
import { useModal } from '@/contexts/modalContext';
import { UserContext } from '@/contexts/userContext';
import { useRouter } from 'next/router';
import { useContext } from 'react';

export const ConfirmUserDelete = () => {
  const { closeModal } = useModal();
  const { logout } = useContext(AuthContext)
  const { deleteSelf, currUser } = useContext(UserContext)

  function deleteUser(userId: string) {
    closeModal()
    deleteSelf(userId)
  }

    return (
        <div className="flex flex-col gap-5 mt-10 max-w-lg">
            <p className="heading-7-500 font-lexend">
            Tem certeza que deseja excluir o seu perfil?
            </p>
            <p className='body-1-400 font-inter'>
            Essa ação não pode ser desfeita. Isso excluirá
            permanentemente sua conta e removerá seus dados de
            nossos servidores.
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
                onClick={() => deleteUser(currUser!.id)}
            >
                Sim, excluir perfil
            </button>

            </div>
        </div>
    );
}
