import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styled from "styled-components";

import sessionsHooks from "../hooks/api/useSession";
import errorsMensage from "../utils/erros";
import { PropsAuthForm, UserSubmitForm } from "../protocols";

function AuthForm(props: PropsAuthForm) {
  const navigate = useNavigate();
  const { functionSignUp } = sessionsHooks.useSignUp();
  const { functionSignIn } = sessionsHooks.useSignIn();

  const validationSchemaSingUp = Yup.object().shape({
    fullname: Yup.string().required("Nome completo é necessario"),
    email: Yup.string().required("Email é necessario").email("Email é invalido"),
    password: Yup.string()
      .required("Senha é necessario")
      .min(6, "A senha tem que ser maior que 6 caracteres")
      .max(40, "A senha não pode exceder 40 caracteres"),
    confirmPassword: Yup.string()
      .required("Senha é necessario")
      .oneOf([Yup.ref("password")], "A senha não são compativeis"),
  });

  const validationSchemaSingIn = Yup.object().shape({
    email: Yup.string().required("Email é necessario").email("Email é invalido"),
    password: Yup.string()
      .required("Senha é necessario")
      .min(6, "A senha tem que ser maior que 6 caracteres")
      .max(40, "A senha não pode exceder 40 caracteres"),
  });

  let schema = validationSchemaSingIn;

  if (props.state) schema = validationSchemaSingUp;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserSubmitForm>({ resolver: yupResolver(schema) });

  async function onSubmit(data: UserSubmitForm) {
    if (props.state) {
      const resp = await functionSignUp(
        data.email,
        data.password,
        data.fullname
      );
      if (resp?.error) errorsMensage(resp.status);
    } else {
      const resp = await functionSignIn(data.email, data.password);
      if (resp?.error) {
        console.log(resp);
        errorsMensage(resp.status);
      } else {
        navigate("/home");
        console.log(resp);
        localStorage.setItem("token", resp.response.token);
      }
    }
  }

  return (
    <>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>

        {props.state && (
          <>
            <input type="text" placeholder="Nome completo" {...register("fullname")}/>
            <MensagerError>{errors.fullname?.message}</MensagerError>
          </>
        )}

        <input type="text" placeholder="Email" {...register("email")} />
        <MensagerError>{errors.email?.message}</MensagerError>

        <input type="password" placeholder="Senha" {...register("password")}/>
        <MensagerError>{errors.password?.message}</MensagerError>

        {props.state && (
          <>
            <input type="password" placeholder="Confirme a senha" {...register("confirmPassword")}/>
            <MensagerError> {errors.confirmPassword?.message} </MensagerError>
          </>
        )}

        <div>
          <button type="submit"> 
            {props.state ? "Registrar" : "Entrar"}  
          </button>

          {props.state && (<button type="button" onClick={() => reset()}>Cancelar</button>)}
        </div>

        <div>
          {!props.state && <span onClick={() => {props.function(false)}}>Não tem conta, clique aqui para criar uma.</span> }
          {props.state && <span onClick={() => {props.function(true)}}>Já tem uma conta, clique aqui para logar.</span> }
        </div>

      </FormContainer>
    </>
  );
}

export default AuthForm;

const FormContainer = styled.form`
  width: 100%;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  input{
    width: 50%;
    height: 50px;
    padding: 5px;
    box-sizing: border-box;

    font-size: 15px;
    border-radius: 5px;
  }
`;

const MensagerError = styled.div`
  color: #FF0000;
  margin-bottom: 10px;
  margin-top: 5px;

`
