import React from "react";
import styled from "styled-components";
import AuthForm from "../../components/AuthForm";

function Login() {
  return (
    <ContainerPage>
      <ContainerLogin>
        <AuthForm state={false}/>
        <AuthForm state={true}/>
      </ContainerLogin>
    </ContainerPage>
  );
}

export default Login;

const ContainerPage = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`
const ContainerLogin = styled.div`
  width: 95%;
  height: 85%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  box-sizing: border-box;
  background-color: #2A2E31;
  color: #ffffff;

  margin: auto;
  padding: 50px;

  border-radius: 50px; 
`;
