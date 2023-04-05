import React, { useState }from "react";
import styled from "styled-components";
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import {spendingInfosType } from "../../protocols";
import EditorBox from "./EditorBox";

function BoxSpending({ id, name, type, value, createdAt, functionSpendingGet }: spendingInfosType) {
  const [editStatus, setEditStatus] = useState(false);
  const dateObject = parseISO(createdAt);
  const formattedDate = format(dateObject, 'dd/MM/yyyy', { locale: ptBR });

  if(type === "OUTPUT") {
    value = "-" + value;
  }
  const valueStylized = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'BRL'}).format(Number(value));
  
  function edit() {
    setEditStatus(!editStatus);
  }

  return (
    <>
      <ContainerBoxSpending onClick={edit}>
        <BoxDescription>
          <h1>{name}</h1>
          <h2>{formattedDate}</h2>
        </BoxDescription>

        <ValueSpending type={type}>
          {valueStylized}
        </ValueSpending>

      </ContainerBoxSpending>

      <EditorBox 
        id={id} 
        name={name}
        type={type}
        value={value}
        functionSpendingGet={functionSpendingGet}
        setEditStatus={setEditStatus}
        editStatus={editStatus}
        edit={edit}
      />
      
    </>
  );
}

export default BoxSpending;


const ContainerBoxSpending = styled.div<any>`
  width: 100%;
  margin-top: 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  :hover {
    background-color: rgba(159, 140, 140, 0.282);
    cursor: pointer;
  }
`;

const BoxDescription = styled.div`
  h1 {
    color: #999;
    font-size: 30px;
  }

  h2 {
    color: #999;
    font-size: 10px;
  }
`

const ValueSpending = styled.div<any>`
  color: ${(props: any) => (props.type === "OUTPUT" ? "#A36041" : "#576E43")};

  span {
    margin-left: 5px;
  }
`;