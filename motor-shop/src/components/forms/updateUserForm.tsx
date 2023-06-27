import {
  tUserUpdateRequest,
  userUpdateSchema,
} from "@/schemas/user.register.schema";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModal } from "@/contexts/modalContext";
import { UserContext } from "@/contexts/userContext";
import { Field } from "../Input";

export default function UpdateUserForm() {
  const { closeModal } = useModal();
  const { currUser } = useContext(UserContext);
  const { updateSelf, deleteSelf } = useContext(UserContext);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm<tUserUpdateRequest>({
    resolver: zodResolver(userUpdateSchema),
    reValidateMode: "onBlur",
    defaultValues: {
      name: currUser?.name,
      email: currUser?.email,
      cpf: currUser?.cpf,
      phone: currUser?.phone,
      date_of_birth: currUser?.date_of_birth,
      description: currUser?.description,
    },
  });

  const [wName, wEmail, wCpf, wPhone, wDate_of_birth, wDescription] = watch([
    "name",
    "email",
    "cpf",
    "phone",
    "date_of_birth",
    "description",
  ]);

  let userId: string = "id";
  if (currUser) {
    userId = currUser.id;
  }
  const onSubmit = (data: tUserUpdateRequest) => {
    updateSelf(userId, data);
    closeModal();
  };

  function deleteUser(userId: string) {
    deleteSelf(userId);
    closeModal();
  }

  return (
    <>
      <main className="bg-grey-8">
        <div className="flex justify-center items-center h-full">
          <div className="z-10 h-full w-[410px] font-medium bg-grey-whiteFixed space-y-8 sm:min-w-max">
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
              <p className="text-body2 font-inter my-4 pb-4">
                Informações pessoais
              </p>
              <Field
                label="Nome"
                type="text"
                placeholder="Nome completo"
                register={register("name")}
                id="name"
                onChange={(e) => setValue("name", e.target.value)}
                defaultValue={currUser?.name}
                className={currUser?.name == wName ? "text-grey-3" : ""}
                error={errors.name?.message}
              />
              <Field
                label="Email"
                type="text"
                placeholder="endereço@email.com.br"
                register={register("email")}
                id="email"
                onChange={(e) => setValue("email", e.target.value)}
                defaultValue={currUser?.email}
                className={currUser?.email == wEmail ? "text-grey-3" : ""}
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
                defaultValue={currUser?.cpf}
                className={currUser?.cpf == wCpf ? "text-grey-3" : ""}
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
                defaultValue={currUser?.phone}
                className={currUser?.phone == wPhone ? "text-grey-3" : ""}
                error={errors.phone?.message}
              />
              <Field
                label="Data de nascimento"
                type="date"
                placeholder=""
                register={register("date_of_birth")}
                id="date_of_birth"
                onChange={(e) =>
                  setValue(
                    "date_of_birth",
                    e.target.value.split("-").reverse().join("-")
                  )
                }
                max={`${new Date().toISOString().split("T")[0]}`}
                defaultValue={currUser?.date_of_birth
                  .split("-")
                  .reverse()
                  .join("-")}
                className={
                  currUser?.date_of_birth == wDate_of_birth ? "text-grey-3" : ""
                }
                required={true}
                error={errors.date_of_birth?.message}
              />
              <Field
                label="Descrição"
                id="description"
                placeholder="Digitar descrição"
                className={`${
                  currUser?.description == wDescription ? "text-grey-3" : ""
                } mb-8 py-2 px-4 resize-none h-20`}
                required={false}
                register={register("description")}
                defaultValue={currUser?.description}
                onChange={(e) => setValue("description", e.target.value)}
                textarea={true}
                error={errors.description?.message}
              />

              <div className="flex flex-col sm:flex-row justify-between gap-2 min-w-max">
                <button
                  type="button"
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
