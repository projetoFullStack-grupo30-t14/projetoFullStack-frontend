import { Field } from "@/components/Input";
import { Footer } from "@/components/headerAndFooter/footer";
import { Header } from "@/components/headerAndFooter/header";
import { UserInput } from "@/components/userInput";
import { AuthContext } from "@/contexts/authContext";
import { TLogin, loginSchema } from "@/schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import router from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<TLogin>({
    resolver: zodResolver(loginSchema),
    reValidateMode: "onBlur",
  });

  const onSubmit = (data: TLogin) => {
    // login(data);
    console.log(data);
  };
  return (
    <>
      <Header />
      <main className="bg-grey-8 py-6">
        <div className="flex justify-center items-center h-full">
          <div className="z-10 py-11 px-12 h-full w-[410px] font-medium bg-grey-whiteFixed space-y-6 rounded">
            <h1 className="text-heading5 font-lexend">Login</h1>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
              {/* <UserInput
                label="Email"
                type="text"
                placeholder="Digitar email"
                registerLogin={register}
                db_field="email"
                onChange={(e) => setValue("email", e.target.value)}
              />
              {errors.email && (
                <small className="error">{errors.email.message}</small>
              )}

              <UserInput
                label="Senha"
                type="password"
                placeholder="Digitar senha"
                registerLogin={register}
                db_field="password"
                onChange={(e) => setValue("password", e.target.value)}
              />
              {errors.password && (
                <small className="error">{errors.password.message}</small>
              )} */}
              <Field
                label="Email"
                id="email"
                type="text"
                placeholder="Digitar email"
                register={register("email")}
                onChange={(e) => setValue("email", e.target.value)}
                error={errors.email?.message}
              />
              <Field
                label="Senha"
                type="password"
                placeholder="Digitar senha"
                register={register("password")}
                id="password"
                onChange={(e) => setValue("password", e.target.value)}
                error={errors.password?.message}
              />
              <Link
                href="/forgetPass"
                className="body-2-500 text-grey-2 text-right mb-8"
              >
                Esqueci minha senha
              </Link>

              <div className="space-y-5">
                <button
                  type="submit"
                  className="w-full btn-big btn-brand1 transition ease-in-out"
                >
                  Entrar
                </button>
                <p className="body-2-400 text-grey-2 text-center">
                  Ainda não possui conta?
                </p>
                <button
                  onClick={() => router.push("/register")}
                  className="w-full btn-big btn-outline2 transition ease-in-out"
                >
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
