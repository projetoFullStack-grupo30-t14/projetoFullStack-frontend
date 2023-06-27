import { Field } from "@/components/Input";
import { Footer } from "@/components/headerAndFooter/footer";
import { Header } from "@/components/headerAndFooter/header";
import { UserContext } from "@/contexts/userContext";
import {
  resetPasswordSchema,
  tResetPassword,
} from "@/schemas/user.register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";

const ResetPassword = () => {
  const router = useRouter();
  const { resetToken } = router.query;
  const { resetPassword } = useContext(UserContext);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<tResetPassword>({
    resolver: zodResolver(resetPasswordSchema),
    reValidateMode: "onBlur",
  });

  const onSubmit = (data: tResetPassword) => {
    if (resetToken !== undefined) {
      const resetTokenString = Array.isArray(resetToken)
        ? resetToken[0]
        : resetToken;
      resetPassword(data, resetTokenString);
    }
  };

  return (
    <>
      <Header />
      <main className="bg-grey-8 py-6">
        <div className="flex justify-center items-center h-full">
          <div className="z-10 py-11 px-12 h-full w-[410px] font-medium bg-grey-whiteFixed space-y-6 rounded">
            <h1 className="text-heading5 font-lexend">Digite uma nova senha</h1>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
              <Field
                label="Senha"
                type="password"
                placeholder="Digitar senha"
                register={register("password")}
                id="password"
                onChange={(e) => setValue("password", e.target.value)}
                error={errors.password?.message}
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
export default ResetPassword;
