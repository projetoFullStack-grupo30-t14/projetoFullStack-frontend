import { Footer } from '@/components/headerAndFooter/footer';
import { Header } from '@/components/headerAndFooter/header';
import {
  tUserRegister,
  userRegisterSchema,
} from '@/schemas/user.register.schema';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterInput } from '@/components/registerInput';
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

export default function RegisterPage() {
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
    console.log(registerData);
    registerRequest(registerData);
  };

  return (
    <>
      <Header />
      <main className="bg-grey-8 py-12">
        <div className="flex justify-center items-center h-full">
          <div className="z-50 py-11 px-12 h-full w-[410px] font-medium bg-grey-whiteFixed space-y-8 rounded">
            <h3 className="text-heading5 font-lexend">Cadastro</h3>
            <p className="text-body2 font-inter">
              Informações pessoais
            </p>
            <form
              className="flex flex-col"
              onSubmit={handleSubmit(onSubmit)}
            >
              <RegisterInput
                label="Nome"
                type="text"
                placeholder="Nome completo"
                register={register}
                db_field="name"
              />
              {errors.name && (
                <small className="error">{errors.name.message}</small>
              )}

              <RegisterInput
                label="Email"
                type="text"
                placeholder="endereço@email.com.br"
                register={register}
                db_field="email"
              />
              {errors.email && (
                <small className="error">
                  {errors.email.message}
                </small>
              )}

              <RegisterInput
                label="CPF"
                type="text"
                placeholder="000.000.000-00"
                register={register}
                db_field="cpf"
                maxLength={14}
              />
              {errors.cpf && (
                <small className="error">{errors.cpf.message}</small>
              )}

              <RegisterInput
                label="Celular"
                type="text"
                placeholder="12 12345-6789"
                register={register}
                db_field="phone"
                maxLength={13}
              />
              {errors.phone && (
                <small className="error">
                  {errors.phone.message}
                </small>
              )}

              <RegisterInput
                label="Data de nascimento"
                type="date"
                placeholder="endereço@email.com.br"
                register={register}
                db_field="date_of_birth"
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
              />
              {errors.description && (
                <small className="error">
                  {errors.description.message}
                </small>
              )}

              <p className="text-inputLabel mb-6">
                Informações de endereço
              </p>

              <RegisterInput
                label="CEP"
                type="text"
                placeholder="12345-678"
                register={register}
                db_field="address.cep"
                maxLength={9}
                onChange={async (e) => {
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
                  <RegisterInput
                    label="Estado"
                    type="text"
                    placeholder="Seu Estado"
                    register={register}
                    db_field="address.state"
                    disabled={true}
                  />
                </div>
                <div className="flex flex-col">
                  <RegisterInput
                    label="Cidade"
                    type="text"
                    placeholder="Sua Cidade"
                    register={register}
                    db_field="address.city"
                    disabled={true}
                  />
                </div>
              </div>

              <RegisterInput
                label="Endereço"
                type="text"
                placeholder="Logradouro e bairro"
                register={register}
                db_field="address.street"
                disabled={true}
              />

              <div className="flex w-fit gap-2 flex-1 box-border">
                <div className="flex flex-col">
                  <RegisterInput
                    label="Número"
                    type="text"
                    placeholder="Ex: 22-A"
                    register={register}
                    db_field="address.number"
                    maxLength={5}
                  />
                  {errors.address?.number && (
                    <small className="error">
                      {errors.address?.number.message}
                    </small>
                  )}
                </div>

                <div className="flex flex-col">
                  <RegisterInput
                    label="Complemento"
                    type="text"
                    placeholder="Ex: apart 307"
                    register={register}
                    db_field="address.complement"
                    maxLength={10}
                  />
                </div>
              </div>

              <p className="text-inputLabel mb-3">Tipo de conta</p>
              <div className="flex gap-2 mb-8">
                <button
                  className={`${
                    selected == 1 ? 'btn-brand1' : 'btn-outline2'
                  } btn-big w-1/2 rounded font-semibold transition ease-in-out`}
                  onClick={(e) => {
                    setSelected(1);
                    setSeller(false);
                    e.preventDefault();
                  }}
                >
                  Comprador
                </button>
                <button
                  className={`${
                    selected == 2 ? 'btn-brand1' : 'btn-outline2'
                  } btn-big w-1/2 rounded font-semibold transition ease-in-out`}
                  onClick={(e) => {
                    setSelected(2);
                    setSeller(true);
                    e.preventDefault();
                  }}
                >
                  Anunciante
                </button>
              </div>

              <RegisterInput
                label="Senha"
                type="password"
                placeholder="Digitar senha"
                register={register}
                db_field="password"
              />
              {errors.password && (
                <small className="error">
                  {errors.password.message}
                </small>
              )}

              <RegisterInput
                label="Confirmar senha"
                type="password"
                placeholder="Digitar senha"
                register={register}
                db_field="confirm"
              />
              {errors.confirm && (
                <small className="error">
                  {errors.confirm.message}
                </small>
              )}

              <button
                type="submit"
                className="btn-big btn-brand1 transition ease-in-out"
              >
                Finalizar Cadastro
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
