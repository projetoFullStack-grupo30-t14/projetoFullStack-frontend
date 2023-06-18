import {
  tUserRegister,
  tUserUpdateRequest,
  userRegisterSchema,
  userUpdateSchema,
} from '@/schemas/user.register.schema';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserInput } from '@/components/userInput';
import { useModal } from '@/contexts/modalContext';
import { UserContext } from '@/contexts/userContext';

interface iAddressResponse {
  bairro: string;
  cep: string;
  complemento: string;
  ddd: string;
  gia: string;
  ibge: string;
  localidade: string;
  logradouro: string;
  siafi: string;
  uf: string;
  erro?: boolean;
}

export default function UpdateUserForm() {
  const { closeModal } = useModal()
  const { currUser } = useContext(UserContext)
//   const [selected, setSelected] = useState<1 | 2>(1);
//   const [seller, setSeller] = useState(false);
  const { updateSelf, deleteSelf } = useContext(UserContext)
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<tUserUpdateRequest>({
    resolver: zodResolver(userUpdateSchema),
    reValidateMode: 'onBlur',
  });

  let userId: string = "id"
  if (currUser) {
    userId = currUser.id
  }
  const onSubmit = (data: tUserUpdateRequest) => {
    updateSelf(userId, data)
    closeModal()
  };

  function deleteUser (userId: string) {
    deleteSelf(userId)
    closeModal()
  }

  return (
    <>
      <main className="bg-grey-8">
        <div className="flex justify-center items-center h-full">
          <div className="z-10 h-full w-[410px] font-medium bg-grey-whiteFixed space-y-8 sm:min-w-max">
            <form
              className="flex flex-col"
              onSubmit={handleSubmit(onSubmit)}
            >

              <p className="text-body2 font-inter my-4 pb-4">
                Informações pessoais
              </p>

              <UserInput
                label="Nome"
                type="text"
                placeholder="Nome completo"
                // register={register}
                db_field="name"
                onChange={(e) => setValue('name', e.target.value)}
              />
              {errors.name && (
                <small className="error">{errors.name.message}</small>
              )}

              <UserInput
                label="Email"
                type="text"
                placeholder="endereço@email.com.br"
                // register={register}
                db_field="email"
                onChange={(e) => setValue('email', e.target.value)}
              />
              {errors.email && (
                <small className="error">
                  {errors.email.message}
                </small>
              )}

              <UserInput
                label="CPF"
                type="text"
                placeholder="000.000.000-00"
                // register={register}
                db_field="cpf"
                onChange={(e) => setValue('cpf', e.target.value)}
                maxLength={14}
              />
              {errors.cpf && (
                <small className="error">{errors.cpf.message}</small>
              )}

              <UserInput
                label="Celular"
                type="text"
                placeholder="12 12345-6789"
                // register={register}
                db_field="phone"
                onChange={(e) => setValue('phone', e.target.value)}
                maxLength={13}
              />
              {errors.phone && (
                <small className="error">
                  {errors.phone.message}
                </small>
              )}

              <UserInput
                label="Data de nascimento"
                type="date"
                placeholder="endereço@email.com.br"
                // register={register}
                db_field="date_of_birth"
                onChange={(e) =>
                  setValue('date_of_birth', e.target.value)
                }
                max={`${new Date().toISOString().split('T')[0]}`}
              />
              {errors.date_of_birth && (
                <small className="error">
                  {errors.date_of_birth.message}
                </small>
              )}

              <label htmlFor="" className="text-inputLabel mb-3">
                Descrição
              </label>
              <textarea
                placeholder="Digitar descrição"
                className="mb-8 py-2 px-4 resize-none h-20"
                {...register('description')}
                onChange={(e) => setValue('name', e.target.value)}
              />
              {errors.description && (
                <small className="error">
                  {errors.description.message}
                </small>
              )}

              <div className='flex flex-col sm:flex-row justify-between gap-2 min-w-max'>
                <button
                    type='button'
                    onClick={closeModal}
                    className="btn-big btn-negative transition ease-in-out"
                >
                    Cancelar
                </button>
                <button
                    onClick={(e) => deleteUser}
                    className="btn-big btn-alert transition ease-in-out"
                >
                    Excluir perfil
                </button>
                <button
                    type="button"
                    className="btn-big btn-brand1 transition ease-in-out"
                >
                    Salvar alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
