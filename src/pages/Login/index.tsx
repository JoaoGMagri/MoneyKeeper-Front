import React, { useState } from "react";
import styled from "styled-components";
import AuthForm from "../../components/AuthForm";

function Login() {
  const [state, setState] = useState(true);

  return (
    <ContainerPage>
      <ContainerLogin>
        <SwitchPages state={state}>
          Money Keeper
          <div>{state ? "Login" : "Cadatro"}</div>
        </SwitchPages>
        <AuthForm state={false} function={setState}/>
        <AuthForm state={true} function={setState}/>
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
  position: relative;

  margin: auto;
  padding: 50px;

  border-radius: 50px; 
`;
const SwitchPages = styled.div<any>`
  width: 50%;
  height: 100%;

  background-color: #3a3d3f;

  transition: all ease 1s;

  position: absolute;
  left: ${(props: any) => (props.state ? "50%" : "0%")};
  top: 0%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-radius: ${(props: any) => (props.state ? "0px 50px 50px 0px" : "50px 0px 0px 50px")};
`