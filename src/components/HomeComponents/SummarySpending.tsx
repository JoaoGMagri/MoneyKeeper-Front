import React, { useEffect, useState } from "react";
import styled from "styled-components";


function SumarySpending({Spending, filter}:any) {

    const [gain, setGain] = useState("");
    const [loss, setLoss] = useState("");
    const [total, setTotal] = useState("");
    const [totalStatus, setTotalStatus] = useState(true);
  
    useEffect(() => {
      let newGain = 0;
      let newLoss = 0;
      let newTotal = 0;
  
      Spending?.forEach((element: any) => {
        if(element.type === "INPUT"){
          newGain += Number(element.value);
        } else {
          newLoss += Number(element.value);
        }
      })
  
      newTotal = newGain - newLoss;

      if(newTotal < 0) {
        setTotalStatus(false);
      } else {
        setTotalStatus(true);
      }
  
      setGain(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(Number(newGain)));
      setLoss(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(Number(newLoss)));
      setTotal(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(Number(newTotal)).replace("-",""));
    }, [Spending]);
  
    return (
        <ContainerSummary>
            <BoxValues>
                <div onClick={() => filter("INPUT")}>
                    <TextValues>Lucro: </TextValues>   
                    <ValueSummary type={true}> {gain}</ValueSummary>
                </div>

                <div onClick={() => filter("OUTPUT")}>
                    <TextValues>Gastos: </TextValues>  
                    <ValueSummary type={false}> {loss}</ValueSummary>
                </div>
            </BoxValues>

            <BoxValues>
                <div onClick={() => filter("ANY")}>
                    <TextValues>Renda final: </TextValues> 
                    <ValueSummary type={totalStatus}> {total}</ValueSummary>
                </div>
            </BoxValues>
        </ContainerSummary>
    );
};

export default SumarySpending;

const ContainerSummary = styled.div`
    width: 100%;
    height: 50%;
    padding: 10px;

    display: flex;
    align-items: center;
    justify-content: space-around;

  
    border-radius: 10px; 
    background-color: #2A2E31;

    @media(max-width: 750px){
        width: 100%;
        height: 15%;
    } 
`;

const BoxValues = styled.div`
    display: flex;
    flex-direction: column;

    div {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        padding: 10px;
    }

    @media(max-width: 750px){
        /* flex-direction: row; */

        div{
            padding: 4px;
        }
    } 
`;

const TextValues = styled.div`
    color: #999;
    font-size: 2vw;
    :hover { cursor: pointer; }
    @media(max-width: 750px){
        font-size: 2.5vw;
    }
`;
const ValueSummary = styled.div<any>`
    color: ${(props: any) => (props.type ? "#576E43" : "#A36041")};
    font-size: 2vw;
    :hover { cursor: pointer; }
    @media(max-width: 750px){
        font-size: 2.5vw;
    }
`;
