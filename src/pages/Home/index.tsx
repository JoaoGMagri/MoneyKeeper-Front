import React from "react";
import styled from "styled-components";
import useToken from "../../hooks/useToken";
import { useNavigate } from "react-router-dom";
import useGetSpeding from "../../hooks/api/useGetSpending";
import BoxSpending from "../../components/BoxSpending";
import { spendingType } from "../../protocols";

function Home() {
  const navigate = useNavigate();
  const { Spending } = useGetSpeding();
  console.log(Spending)
  const token = useToken()
  if (!token) {
    navigate("/");
  }
  return (
    <ContainerPage>
      <ContainerBoxSpendings>
        <h1>Gastos</h1>
        {Spending?.map( (element:spendingType) => { 
          return <BoxSpending 
          key={element.id} 
          type={element.type}
          name={element.name}
          value={element.value}/>
          } )}
      </ContainerBoxSpendings>
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

const ContainerBoxSpendings = styled.div`
  width: 25%;
  height: 90%;
  padding: 10px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  overflow-y: scroll;
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: #2A2E31;

  h1 {
    font-size: 30px;
    margin-bottom: 5px;
  }
`