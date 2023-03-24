import React from "react";
import styled from "styled-components";
import useToken from "../../hooks/useToken";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const token = useToken()
  if (token === null) {
    navigate("/");
  }
  return (
    <ContainerPage>
        Home
        {token}
    </ContainerPage>
  );
}

export default Home;

const ContainerPage = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`