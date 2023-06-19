import { Footer } from '@/components/headerAndFooter/footer';
import { Header } from '@/components/headerAndFooter/header';
import {
  tUserRegister,
  userRegisterSchema,
} from '@/schemas/user.register.schema';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserInput } from '@/components/userInput';
import { api } from '@/services';
import { useAuth } from '@/contexts/authContext';

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

export default function UpdateAddressForm() {
  const [selected, setSelected] = useState<1 | 2>(1);
  const [seller, setSeller] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<tUserRegister>({
    resolver: zodResolver(userRegisterSchema),
    reValidateMode: 'onBlur',
  });

  const { register: registerRequest } = useAuth();
  // console.log(errors)
  const onSubmit = (data: tUserRegister) => {
    console.log(data);
    const { confirm, ...registerData } = data;
    registerData.seller = seller;
    registerData.date_of_birth = registerData.date_of_birth
      .split('-')
      .reverse()
      .join('-');
    console.log(registerData);
    registerRequest(registerData);
  };

  return (
    <>
      <main className="bg-grey-8">
        <div className="flex justify-center items-center h-full">
          <div className="z-10 h-full w-[410px] font-medium bg-grey-whiteFixed space-y-8 sm:min-w-max">
            <form
              className="flex flex-col"
              onSubmit={handleSubmit(onSubmit)}
            >

              <p className="text-inputLabel mb-6">
                Informações de endereço
              </p>

              <UserInput
                label="CEP"
                type="text"
                placeholder="12345-678"
                register={register}
                db_field="address.cep"
                maxLength={9}
                onChange={async (e) => {
                  setValue('address.cep', e.target.value);
                  if (e.currentTarget.value.length == 9) {
                    try {
                      const cep = e.currentTarget.value
                        .split('-')
                        .join('');
                      const response =
                        await api.get<iAddressResponse>(
                          `https://viacep.com.br/ws/${cep}/json/`
                        );

                      setValue('address.state', response.data.uf);
                      setValue(
                        'address.street',
                        `${response.data.logradouro}, ${response.data.bairro}`
                      );
                      setValue(
                        'address.city',
                        response.data.localidade
                      );

                      if (response.data.erro) {
                        return (
                          <small className="error">
                            CEP não encontrado
                          </small>
                        );
                      }
                    } catch (error) {
                      console.log(error);
                    }
                  } else {
                    setValue('address.state', '');
                    setValue('address.street', '');
                    setValue('address.city', '');
                  }
                }}
              />
              {errors.address?.cep && (
                <small className="error">
                  {errors.address?.cep.message}
                </small>
              )}

              <div className="flex w-fit gap-2 flex-1 box-border">
                <div className="flex flex-col">
                  <UserInput
                    label="Estado"
                    type="text"
                    placeholder="Seu Estado"
                    register={register}
                    db_field="address.state"
                    disabled={true}
                  />
                </div>
                <div className="flex flex-col">
                  <UserInput
                    label="Cidade"
                    type="text"
                    placeholder="Sua Cidade"
                    register={register}
                    db_field="address.city"
                    disabled={true}
                  />
                </div>
              </div>

              <UserInput
                label="Endereço"
                type="text"
                placeholder="Logradouro e bairro"
                register={register}
                db_field="address.street"
                disabled={true}
              />

              <div className="flex w-fit gap-2 flex-1 box-border">
                <div className="flex flex-col">
                  <UserInput
                    label="Número"
                    type="text"
                    placeholder="Ex: 22-A"
                    register={register}
                    db_field="address.number"
                    onChange={(e) =>
                      setValue('address.number', e.target.value)
                    }
                    maxLength={5}
                  />
                  {errors.address?.number && (
                    <small className="error">
                      {errors.address?.number.message}
                    </small>
                  )}
                </div>

                <div className="flex flex-col">
                  <UserInput
                    label="Complemento"
                    type="text"
                    placeholder="Ex: apart 307"
                    register={register}
                    db_field="address.complement"
                    onChange={(e) =>
                      setValue('address.complement', e.target.value)
                    }
                    maxLength={10}
                  />
                </div>
              </div>

              <div className='flex justify-end gap-2 min-w-max'>
                <button
                    type='button'
                    className="btn-big btn-negative transition ease-in-out"
                >
                    Cancelar
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
