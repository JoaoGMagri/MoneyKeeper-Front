import styled from "styled-components";

import { Props, spendingInfosType } from "../protocols";
import { useState } from "react";
import NewSpendingForm from "./NewSpendingForm";

function BoxSpending({ id, name, type, value, functionSpendingGet }: spendingInfosType) {
  const [editStatus, setEditStatus] = useState(false);

  if(type === "OUTPUT") {
    value = "-" + value;
  }
  const teste = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'BRL'}).format(Number(value));
  
  function edit() {
    setEditStatus(!editStatus);
  }

  return (
    <>
      <ContainerBoxSpending onClick={edit}>
        <h1>{name}</h1>

        <ValueSpending type={type}>
          {teste}
        </ValueSpending>
      </ContainerBoxSpending>
      <ContainerEditor onClick={edit} editStatus={editStatus} />
      <BoxEditor editStatus={editStatus}>
        <NewSpendingForm model={"UPDATE"} functionSpendingGet={functionSpendingGet} setEditStatus={setEditStatus} value={value} type={type} name={name} id={id}/>
      </BoxEditor>  
      
    </>
  );
}

export default BoxSpending;

const ContainerEditor = styled.div<any>`
  width: 100%;
  height: 100%;
  display: ${(props: any) => (props.editStatus ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;
const BoxEditor = styled.div<any>`
    width: 60%;
    height: 50%;
    padding: 25px;

    display: ${(props: any) => (props.editStatus ? "flex" : "none")};
    align-items: flex-start;
    justify-content: flex-start;
    
    position: absolute;
    right: 20%;
    top: 25%;
    z-index: 1000;
    
    border-radius: 50px;
    background-color: #2A2E31;
`

const ContainerBoxSpending = styled.div<any>`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-size: 20px;
    margin-bottom: 5px;
  }

  :hover {
    background-color: rgba(159, 140, 140, 0.282);
    cursor: pointer;
  }
`;

const ValueSpending = styled.div<Props>`
  color: ${(props: any) => (props.type === "OUTPUT" ? "#A36041" : "#576E43")};

  span {
    margin-left: 5px;
  }
`;
