import { useModal } from '@/contexts/modalContext';
import { useRouter } from 'next/router';

export const RegisterSuccess = () => {
  const router = useRouter();
  const { closeModal } = useModal();
    return (
        <div className="flex flex-col gap-5 mt-14">
          <p className="heading-7-500 font-lexend">
            Sua conta foi criada com sucesso!
          </p>
          <p className='body-1-400 font-inter'>
            Agora você poderá ver seus negócios crescendo em grande
            escala.
          </p>
          <button
            className="btn-medium btn-brand1 self-start"
          onClick={() => {
            router.push('/login')
            closeModal()
            }}
          >
            Ir para o login
          </button>
        </div>
    );
}
