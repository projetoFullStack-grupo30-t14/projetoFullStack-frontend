import { Field } from "@/components/Input";
import { Footer } from "@/components/headerAndFooter/footer";
import { Header } from "@/components/headerAndFooter/header";
import { UserContext } from "@/contexts/userContext";
import {
  tUserSendMail,
  userSendMailPassSchema,
} from "@/schemas/user.register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import { useContext } from "react";
import { useForm } from "react-hook-form";

const ForgetPassPage = () => {
  const { sendMailPass } = useContext(UserContext);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<tUserSendMail>({
    resolver: zodResolver(userSendMailPassSchema),
    reValidateMode: "onBlur",
  });

  const onSubmit = (data: tUserSendMail) => {
    sendMailPass(data);
  };

  return (
    <>
      <Head>
        <title>MotorShop - Esqueci minha senha</title>
      </Head>
      <Header />
      <main className="bg-grey-8 py-6">
        <div className="flex justify-center items-center h-full">
          <div className="z-10 py-11 px-12 h-full w-[410px] font-medium bg-grey-whiteFixed space-y-6 rounded">
            <h1 className="text-heading5 font-lexend">
              Digite o email cadastrado
            </h1>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
              <Field
                label="Email"
                id="email"
                type="text"
                placeholder="Digitar email"
                register={register("email")}
                onChange={(e) => setValue("email", e.target.value)}
                error={errors.email?.message}
              />

              <div className="space-y-5">
                <button
                  type="submit"
                  className="w-full btn-big btn-brand1 transition ease-in-out"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
export default ForgetPassPage;
