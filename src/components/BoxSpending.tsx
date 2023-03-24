import styled from "styled-components";

import { Props, spendingInfosType } from "../protocols";

function BoxSpending( {name, type, value}: spendingInfosType ) {

    return (
        <ContainerBoxSpending>
          <h1>{name}</h1>
          
          <ValueSpending type={type}>
            {type === "OUTPUT" && <>-</>} 
            {value}
            <span>R$</span>
          </ValueSpending>
        </ContainerBoxSpending>
    )

}

export default BoxSpending;

const ContainerBoxSpending = styled.div`
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;

    h1{
        font-size:20px;
        margin-bottom: 5px;
    }
`


const ValueSpending = styled.div<Props>`
    color: ${(props:any ) => (props.type === "OUTPUT") ? "#A36041" : "#576E43"};

    span{
        margin-left: 5px;
    }
`

