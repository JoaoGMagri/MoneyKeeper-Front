import React, { useEffect, useState } from "react";
import styled from "styled-components";

import useToken from "../../hooks/useToken";
import { useNavigate } from "react-router-dom";
import useGetSpeding from "../../hooks/api/useGetSpending";
import TopBar from "../../components/TopBar";
import NewSpendingForm from "../../components/FormsComponents/NewSpendingForm";
import SumarySpending from "../../components/HomeComponents/SummarySpending";
import Groups from "../../components/HomeComponents/MenuGroups";
import ListSpending from "../../components/HomeComponents/ListSpending";

function Home() {
  const navigate = useNavigate();
  const { Spending , functionSpendingGet } = useGetSpeding();

  const [valueFilter, setValueFilter] = useState("ANY");
  const [spendingFilter, setSpengingFilter] = useState(Spending);

  const token = useToken()
  if (!token) {
    navigate("/");
  }

  useEffect(() => {
    setValueFilter("ANY");
    setSpengingFilter(Spending);
  }, [Spending]);

  function filter( type: string) {
    setValueFilter(type)
    setSpengingFilter(Spending);
    if (type !== "ANY") {
      setSpengingFilter(Spending.filter((e:any) => e.type === type))
    }
  }

  return (
    <ContainerPage>
      <TopBar/>

      {/* Layout maior que 750px */}
      <ContainerRight>

        <BoxTopRigth>
          <NewSpendingForm model={"CREATED"} functionSpendingGet={functionSpendingGet} setEditStatus={console.log}/>
        </BoxTopRigth>
        

        <BoxBottomRigth>
          <Groups/>

          <SumarySpending Spending={Spending} filter={filter}/>
        </BoxBottomRigth>


      </ContainerRight>

      <ContainerLeft>
        <ListSpending 
          spendingFilter={spendingFilter} 
          valueFilter={valueFilter} 
          filter={filter} 
          functionSpendingGet={functionSpendingGet}
        />
      </ContainerLeft>

    </ContainerPage>
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
`;
const ContainerRight = styled.div`
  width: 65%;
  height: 90%;
  padding: 10px;


  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media(max-width: 750px){
    display: none
  } 
`;
const ContainerLeft = styled.div`
  width: 32%;
  height: 90%;
  padding: 10px;

  overflow-y: scroll;
  border-radius: 10px; 
  background-color: #2A2E31;

  @media(max-width: 750px){
    display: none
  } 

`;

const BoxBottomRigth = styled.div`
  width: 100%;
  height: 50%;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-end;
`;
const BoxTopRigth = styled.div`
  width: 100%;
  height: 48%;
  padding: 10px;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  
  border-radius: 10px; 
  background-color: #2A2E31;
`;


