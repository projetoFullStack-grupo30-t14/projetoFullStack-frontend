import { Footer } from "@/components/headerAndFooter/footer";
import { Header } from "@/components/headerAndFooter/header";
import {
  tUserRegister,
  userRegisterSchema,
} from "@/schemas/user.register.schema";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/services";
import { useAuth } from "@/contexts/authContext";
import { useModal } from "@/contexts/modalContext";
import Modal from "@/components/modal/modal";
import { Field } from "@/components/Input";

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
    reValidateMode: "onBlur",
  });

  const { register: registerRequest } = useAuth();
  const { showModal, stateModal } = useModal();

  const onSubmit = (data: tUserRegister) => {
    const { confirm, ...registerData } = data;
    registerData.seller = seller;
    registerData.date_of_birth = registerData.date_of_birth
      .split("-")
      .reverse()
      .join("-");
    registerRequest(registerData);
  };

  return (
    <>
      <Header />
      {stateModal && <Modal />}
      <main className="bg-grey-8 py-12 px-4 w-screen">
        <div className="flex justify-center items-center h-full">
          <div className="z-10 py-11 px-[8%] h-full sm:px-12 max-w-[410px] font-medium bg-grey-whiteFixed space-y-8 rounded">
            <h3 className="text-heading5 font-lexend">Cadastro</h3>
            <p className="text-body2 font-inter">Informações pessoais</p>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
              <Field
                label="Nome"
                type="text"
                id="name"
                placeholder="Nome completo"
                register={register("name")}
                onChange={(e) => setValue("name", e.target.value)}
                error={errors.name?.message}
              />
              <Field
                label="Email"
                id="email"
                type="text"
                placeholder="endereço@email.com.br"
                register={register("email")}
                onChange={(e) => setValue("email", e.target.value)}
                error={errors.email?.message}
              />
              <Field
                label="CPF"
                type="text"
                placeholder="000.000.000-00"
                register={register("cpf")}
                id="cpf"
                onChange={(e) => setValue("cpf", e.target.value)}
                maxLength={14}
                error={errors.cpf?.message}
              />
              <Field
                label="Celular"
                type="text"
                placeholder="12 12345-6789"
                register={register("phone")}
                id="phone"
                onChange={(e) => setValue("phone", e.target.value)}
                maxLength={13}
                error={errors.phone?.message}
              />
              <Field
                label="Data de nascimento"
                type="date"
                placeholder=""
                register={register("date_of_birth")}
                id="date_of_birth"
                onChange={(e) => setValue("date_of_birth", e.target.value)}
                max={`${new Date().toISOString().split("T")[0]}`}
                required={true}
                error={errors.date_of_birth?.message}
              />
              <Field
                label="Descrição"
                id="description"
                textarea={true}
                placeholder="Digitar descrição"
                register={register("description")}
                onChange={(e) => setValue("description", e.target.value)}
                error={errors.description?.message}
              />

              <p className="text-inputLabel mb-6">Informações de endereço</p>
              <Field
                label="CEP"
                type="text"
                placeholder="12345-678"
                register={register("address.cep")}
                id="address.cep"
                maxLength={9}
                onChange={async (e) => {
                  setValue("address.cep", e.target.value);
                  if (e.currentTarget.value.length == 9) {
                    try {
                      const cep = e.currentTarget.value.split("-").join("");
                      const response = await api.get<iAddressResponse>(
                        `https://viacep.com.br/ws/${cep}/json/`
                      );

                      setValue("address.state", response.data.uf);
                      setValue(
                        "address.street",
                        `${response.data.logradouro}, ${response.data.bairro}`
                      );
                      setValue("address.city", response.data.localidade);

                      if (response.data.erro) {
                        return (
                          <small className="error">CEP não encontrado</small>
                        );
                      }
                    } catch (error) {
                      console.log(error);
                    }
                  } else {
                    setValue("address.state", "");
                    setValue("address.street", "");
                    setValue("address.city", "");
                  }
                }}
                error={errors.address?.cep?.message}
              />

              <div className="flex w-fit gap-2 flex-1 box-border">
                <div className="flex flex-col">
                  <Field
                    label="Estado"
                    type="text"
                    placeholder="Seu Estado"
                    register={register("address.state")}
                    id="address.state"
                    disabled={true}
                  />
                </div>
                <div className="flex flex-col">
                  <Field
                    label="Cidade"
                    type="text"
                    placeholder="Sua Cidade"
                    register={register("address.city")}
                    id="address.city"
                    disabled={true}
                  />
                </div>
              </div>

              <Field
                label="Endereço"
                type="text"
                placeholder="Logradouro e bairro"
                register={register("address.street")}
                id="address.street"
                disabled={true}
              />

              <div className="flex w-fit gap-2 flex-1 box-border">
                <div className="flex flex-col">
                  <Field
                    label="Número"
                    type="text"
                    placeholder="Ex: 22-A"
                    register={register("address.number")}
                    id="address.number"
                    onChange={(e) => setValue("address.number", e.target.value)}
                    maxLength={5}
                    error={errors.address?.number?.message}
                  />
                </div>

                <div className="flex flex-col">
                  <Field
                    label="Complemento"
                    type="text"
                    placeholder="Ex: apart 307"
                    register={register("address.complement")}
                    id="address.complement"
                    onChange={(e) =>
                      setValue("address.complement", e.target.value)
                    }
                    maxLength={10}
                  />
                </div>
              </div>

              <p className="text-inputLabel mb-3">Tipo de conta</p>
              <div className="flex gap-2 mb-8">
                <button
                  className={`${
                    selected == 1 ? "btn-brand1" : "btn-outline2"
                  } btn-big w-[50%] px-0 rounded font-semibold transition ease-in-out`}
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
                    selected == 2 ? "btn-brand1" : "btn-outline2"
                  } btn-big w-[50%] px-0 rounded font-semibold transition ease-in-out`}
                  onClick={(e) => {
                    setSelected(2);
                    setSeller(true);
                    e.preventDefault();
                  }}
                >
                  Anunciante
                </button>
              </div>
              <Field
                label="Senha"
                type="password"
                placeholder="Digitar senha"
                register={register("password")}
                id="password"
                onChange={(e) => setValue("password", e.target.value)}
                error={errors.password?.message}
              />
              <Field
                label="Confirmar senha"
                type="password"
                placeholder="Digitar senha"
                register={register("confirm")}
                id="confirm"
                onChange={(e) => setValue("confirm", e.target.value)}
                error={errors.confirm?.message}
              />

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
