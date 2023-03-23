import React from 'react';
import styled from 'styled-components';

function SingIn() {
  return (
    <ContainerSingIn>
      Sing In
    </ContainerSingIn>
  );
}

export default SingIn;

const ContainerSingIn = styled.div`
    width: 100vw;
    height: 100vh;

    box-sizing: border-box;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: red;

    color: #ffffff;

`
