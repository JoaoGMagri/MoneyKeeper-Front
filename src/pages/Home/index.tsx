import React, { useState } from "react";
import styled from "styled-components";
import useToken from "../../hooks/useToken";
import { useNavigate } from "react-router-dom";
import useGetSpeding from "../../hooks/api/useGetSpending";
import BoxSpending from "../../components/BoxSpending";
import { spendingType } from "../../protocols";
import TopBar from "../../components/TopBar";
import NewSpendingForm from "../../components/NewSpendingForm";

function Home() {
  const navigate = useNavigate();
  const { Spending , functionSpendingGet } = useGetSpeding();
  console.log("index", Spending)
  const token = useToken()
  if (!token) {
    navigate("/");
  }

  return (
    <>
      <ContainerPage>
        <TopBar/>

        <ContainerNewSpending>
          <NewSpendingForm functionSpendingGet={functionSpendingGet}/>
        </ContainerNewSpending>

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
    </>
  );
}

export default Home;

const ContainerPage = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 10px;

  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`

const ContainerNewSpending = styled.div`
  width: 65%;
  height: 90%;
  padding: 10px;
  
  border-radius: 10px; 
  background-color: #2A2E31;
`
const ContainerBoxSpendings = styled.div`
  width: 25%;
  height: 90%;
  padding: 10px;

  overflow-y: scroll;
  border-radius: 10px; 
  background-color: #2A2E31;

  h1 {
    font-size: 30px;
    margin-bottom: 5px;
  }
`