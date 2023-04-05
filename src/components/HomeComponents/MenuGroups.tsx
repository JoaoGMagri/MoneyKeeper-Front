import React from "react";
import styled from "styled-components";


function Groups( ) {

  
    return (
        <ContainerGroups>
            <TextValues> Grupos </TextValues>

            <NewGroup onClick={() => alert("Função em desenvolvimento")}>+</NewGroup>
        </ContainerGroups>
    );
};

export default Groups;

const ContainerGroups = styled.div`
    width: 100%;
    height: 40%;
    padding: 10px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

  
    border-radius: 10px; 
    background-color: #2A2E31;
`;

const TextValues = styled.div`
    color: #999;
    font-size: 30px;
    margin-bottom: 10px;
`;
const NewGroup = styled.div`
    width: 50px;
    height: 50px;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 50px;
    color: #999;

    background-color: #242a2e;
    border-radius: 100%;

    :hover { cursor: pointer; }
`;
