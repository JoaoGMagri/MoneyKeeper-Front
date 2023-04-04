import React, { useState, useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import AuthForm from "../../components/AuthForm";

function Login() {
  const [state, setState] = useState(true);

  const divRefLogin:any = useRef(null);
  const divRefRegister:any = useRef(null);
  const [positionLogin, setPositionLogin] = useState({});
  
  useLayoutEffect(() => {
    function atualizarPosicao() {
      if (state) {
        const divPosicaoLogin = divRefLogin.current.getBoundingClientRect();
        setPositionLogin({ bottom: divPosicaoLogin.bottom, left: divPosicaoLogin.left, width: divPosicaoLogin.width });   
      } else {
        const divPosicaoRegister = divRefRegister.current.getBoundingClientRect();
        setPositionLogin({ bottom: divPosicaoRegister.bottom, left: divPosicaoRegister.left, width: divPosicaoRegister.width });   
      }
    }

    atualizarPosicao();
    window.addEventListener('resize', atualizarPosicao);
    window.addEventListener('scroll', atualizarPosicao);
    return () => {
      window.removeEventListener('resize', atualizarPosicao);
      window.removeEventListener('scroll', atualizarPosicao);
    };
  }, [state]);

  return (
    <ContainerPage>
      <Teste position={positionLogin}/>

      <ContainerLogin>
        <LogoPageMobile >MoneyKeeper</LogoPageMobile>

        {/* Switch para mobile (menor que 600px) */}
        <BoxMensageSwitcher state={state}>
          <span ref={divRefLogin} onClick={() => {setState(true)}}>Login</span>
          <span ref={divRefRegister} onClick={() => {setState(false)}}>Cadastro</span>
        </BoxMensageSwitcher>
        
        {/* Banner de Switch para pc (maior que 600px) */}
        <SwitchPages state={state}>
          <LogoPageDesktop state={state}>MoneyKeeper</LogoPageDesktop>
          <p>{state ? "Login" : "Cadastro"}</p>
        </SwitchPages>

        <BoxForms>
          <DivLogin state={state}>
            <AuthForm state={false} function={setState}/>
          </DivLogin>
          <DivRegister state={state}>
            <AuthForm state={true} function={setState}/>
          </DivRegister>
        </BoxForms>

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
`;
const ContainerLogin = styled.div`
  width: 95%;
  height: 85%;

  display: flex;
  justify-content: space-around;
  align-items: center;

  box-sizing: border-box;
  background-color: #2A2E31;
  color: #ffffff;
  position: relative;
  

  margin: auto;
  padding: 50px;
  
  border-radius: 50px; 

  @media(max-width: 600px){
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

`;
const LogoPageDesktop = styled.div<any>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Comfortaa', cursive;
  font-size: 5.5vw;
  margin-bottom: 20px;
  background-image: ${(props: any) => (props.state ? " linear-gradient(to right, #dc6a36, #c8541e, #A36041, #c9c9c9)" : "linear-gradient(to left, #dc6a36, #c8541e, #A36041, #c9c9c9)")};
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
`;
const LogoPageMobile = styled.div`
  display:none;
  @media (max-width: 601px){
    display: inline;
    font-family: 'Comfortaa', cursive;
    font-size: 7vw;
    margin-bottom: 10px;
    background-image: linear-gradient(to right, #dc6a36, #c8541e, #A36041, #c9c9c9);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
  }
`;
const SwitchPages = styled.div<any>`
  width: 50%;
  height: 100%;

  background-color: #3a3d3f;

  transition: all ease 1s;

  position: absolute;
  left: ${(props: any) => (props.state ? "50%" : "0%")};
  top: 0%;
  z-index: 2;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-radius: ${(props: any) => (props.state ? "0px 50px 50px 0px" : "50px 0px 0px 50px")};

  p{
    transition: all ease 2s;
    height: 50px;
    font-family: 'Comfortaa', cursive;
    font-size: 3.5vw;
    background: ${(props: any) => (props.state ? "linear-gradient(to right, #dc6a36, #c8541e, #A36041, #c9c9c9)" : "linear-gradient(to left, #dc6a36, #c8541e, #A36041, #c9c9c9)")};
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
  }

  @media(max-width: 600px){
    display: none;
  }
`;
const BoxMensageSwitcher = styled.div<any>`
  width: 100%;

  display: flex;
  justify-content: space-around;
  align-items: center;

  margin-bottom: 50px;
  transition: text-decoration ease 1s;

  :hover {
    cursor: pointer;
  }

  @media (min-width: 601px){
    display: none;
  }
`;
const Teste = styled.div<any>`
  width: ${(props: any) => (props.position.width+"px")};;
  height: 2px;
  background-color: #FFFFFF;

  position: absolute;
  top: ${(props: any) => (props.position.bottom+"px")};
  left: ${(props: any) => (props.position.left+"px")};
  z-index: 100000;

  transition: all ease 1s;

  @media (min-width: 601px){
    display: none;
  }
`;
const BoxForms = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  
  @media(max-width: 600px){
    display: flex;
    justify-content: flex-start;
    align-items: center;
    
    position: relative;
  }

`
const DivLogin = styled.div<any>`
  width: 100%;
  @media(max-width: 600px){
    width: 100%;
    transition: all ease 0.5s; 
    opacity: ${(props: any) => (props.state ? "1" : "0")};
    position: absolute;
    top: 0;
    left: ${(props: any) => (props.state ? "0px" : "-1000px")};
  }
`
const DivRegister = styled.div<any>`
  width: 100%;
  @media(max-width: 600px){
    width: 100%;
    transition: all ease 0.5s; 
    opacity: ${(props: any) => (props.state ? "0" : "1")};
    position: absolute;
    top: 0;
    left: ${(props: any) => (props.state ? "-1000px" : "0px")};
  }
`