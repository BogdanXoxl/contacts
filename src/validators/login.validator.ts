import * as yup from "yup";

const password_regx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g;

export const loginSchema = yup
  .object({
    email: yup.string().email("Неверный формат!").required("Email - обязательное поле!"),
    password: yup
      .string()
      .min(8, "Пароль должен быть не меньше 8 символов!")
      .matches(
        password_regx,
        "Пароль должен содержать цифры, заглавные, прописные и спец. символы!"
      )
      .required("Password - обязательное поле!"),
  })
  .required();
