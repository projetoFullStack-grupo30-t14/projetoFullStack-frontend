import {
  addressSchema,
  tAddress,
  tAddressResponse,
} from "@/schemas/user.register.schema";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/services";
import { useModal } from "@/contexts/modalContext";
import { UserContext } from "@/contexts/userContext";
import { toast } from "react-toastify";
import { Field } from "../Input";

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
  const { closeModal } = useModal();
  const { currAddress, setCurrAddress, headers } = useContext(UserContext);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm<tAddress>({
    resolver: zodResolver(addressSchema),
    reValidateMode: "onBlur",
    defaultValues: {
      cep: currAddress?.cep,
      city: currAddress?.city,
      complement: currAddress?.complement,
      number: currAddress?.number,
      state: currAddress?.state,
      street: currAddress?.street,
    },
  });

  const [wCep, wCity, wComplement, wNumber, wState, wStreet] = watch([
    "cep",
    "city",
    "complement",
    "number",
    "state",
    "street",
  ]);

  const onSubmit = async (data: tAddress) => {
    const address = (
      await api.patch<tAddressResponse>("addresses", data, headers)
    ).data;
    setCurrAddress(address);
    console.log(currAddress);
    closeModal();
  };

  return (
    <>
      <main className="bg-grey-8">
        <div className="flex justify-center items-center h-full">
          <div className="z-10 h-full w-[410px] font-medium bg-grey-whiteFixed space-y-8 sm:min-w-max">
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
              <p className="text-inputLabel mb-6">Informações de endereço</p>
              <Field
                label="CEP"
                type="text"
                placeholder="12345-678"
                register={register("cep")}
                id="cep"
                maxLength={9}
                className={currAddress?.cep == wCep ? "text-grey-3" : ""}
                onChange={async (e) => {
                  setValue("cep", e.target.value);
                  if (e.currentTarget.value.length == 9) {
                    try {
                      const cep = e.currentTarget.value.split("-").join("");
                      const response = await api.get<iAddressResponse>(
                        `https://viacep.com.br/ws/${cep}/json/`
                      );

                      setValue("state", response.data.uf);
                      setValue(
                        "street",
                        `${response.data.logradouro}, ${response.data.bairro}`
                      );
                      setValue("city", response.data.localidade);

                      if (response.data.erro) {
                        console.log(response);
                        toast.error("CEP Inválido!");
                        setValue("state", "");
                        setValue("street", "");
                        setValue("city", "");
                      }
                    } catch (error) {
                      console.log(error);
                    }
                  } else {
                    setValue("state", "");
                    setValue("street", "");
                    setValue("city", "");
                  }
                }}
              />

              <div className="flex w-fit gap-2 flex-1 box-border">
                <div className="flex flex-col">
                  <Field
                    label="Estado"
                    type="text"
                    placeholder="Seu Estado"
                    register={register("state")}
                    id="state"
                    disabled={true}
                    className={
                      currAddress?.state == wState ? "text-grey-3" : ""
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <Field
                    label="Cidade"
                    type="text"
                    placeholder="Sua Cidade"
                    register={register("city")}
                    id="city"
                    disabled={true}
                    className={currAddress?.city == wCity ? "text-grey-3" : ""}
                  />
                </div>
              </div>
              <Field
                label="Endereço"
                type="text"
                placeholder="Logradouro e bairro"
                register={register("street")}
                id="street"
                disabled={true}
                className={currAddress?.street == wStreet ? "text-grey-3" : ""}
              />
              {/* setValue( 'street', `${response.data.logradouro}, $
              {response.data.bairro}` ); */}
              <div className="flex w-fit gap-2 flex-1 box-border">
                <div className="flex flex-col">
                  <Field
                    label="Número"
                    type="text"
                    placeholder="Ex: 22-A"
                    register={register("number")}
                    id="number"
                    onChange={(e) => setValue("number", e.target.value)}
                    maxLength={5}
                    className={
                      currAddress?.number == wNumber ? "text-grey-3" : ""
                    }
                    error={errors.number?.message}
                  />
                </div>

                <div className="flex flex-col">
                  <Field
                    label="Complemento"
                    type="text"
                    placeholder="Ex: apart 307"
                    register={register("complement")}
                    id="complement"
                    onChange={(e) => setValue("complement", e.target.value)}
                    maxLength={10}
                    className={
                      currAddress?.complement == wComplement
                        ? "text-grey-3"
                        : ""
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 min-w-max">
                <button
                  type="button"
                  className="btn-big btn-negative transition ease-in-out"
                  onClick={closeModal}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
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
