import React from "react";
import styled from "styled-components";

function SingIn() {
  return (
    <ContaionerSingIn>
        <div>SingIn</div>
        <input/>
        <input/>
    </ContaionerSingIn>
  );
}

export default SingIn;

const ContaionerSingIn = styled.div`
    
    display: flex;
    flex-direction: column;
    align-itens: center;
    justify-content: center;

`
