import React from "react";
import styled from "styled-components";

import BoxSpending from "./BoxSpending";
import { spendingType } from "../../protocols";


function ListSpending({spendingFilter, valueFilter, filter, functionSpendingGet}:any) {

  
    return (
        <ContainerListSpending>
            <Title>Receita</Title>
          
            <CustomSelect value={valueFilter}>
                <option value="ANY" onClick={() => {filter("ANY")}}>Any</option>
                <option value="INPUT" onClick={() => {filter("INPUT")}}>Lucros</option>
                <option value="OUTPUT" onClick={() => {filter("OUTPUT")}}>Gastos</option>
            </CustomSelect>
            
            <BoxList>
                {spendingFilter?.map( (element:spendingType) => { 
                    return <BoxSpending 
                    key={element.id} 
                    id={element.id}
                    type={element.type}
                    name={element.name}
                    value={element.value}
                    createdAt={element.createdAt}
                    functionSpendingGet={functionSpendingGet}/>
                })}
            </BoxList>
        </ContainerListSpending>
    );
};

export default ListSpending;

const ContainerListSpending = styled.div`
    width: 100%;
    height: 100%;
    @media(max-width: 750px){
        height: 70%;
    } 
`
const Title = styled.h1`
    color: #999;
    font-size: 30px;

    @media(max-width: 750px){
        margin-top: 20px;
    } 
`
const CustomSelect = styled.select`
  width: 100%;
  height: 40px;
  margin-bottom: 20px;

  font-size: 16px;
  color: #999;

  background: transparent;
  border: none;
  border-bottom: 1px solid #515151;
`;
const BoxList = styled.div`
    height: 90%;

    overflow-y: scroll;

    @media(max-width: 750px){
        width: 100%;
        height: 70%;
    } 
`

