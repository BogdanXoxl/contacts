import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../src/validators/login.validator";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

type InputsType = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsType>({ resolver: yupResolver(loginSchema) });
  const router = useRouter();

  const onSubmit: SubmitHandler<InputsType> = async (data) => {
    const res = await signIn("credentials", { ...data, redirect: false });

    if (!res?.error) {
      toast.success("Мы Вас заждались!", {
        closeButton: false,
        closeOnClick: false,
      });
      await router.push("/");
    } else {
      toast.error("Неверные данные!", {
        autoClose: false,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email")} />
        <input {...register("password")} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default LoginPage;
