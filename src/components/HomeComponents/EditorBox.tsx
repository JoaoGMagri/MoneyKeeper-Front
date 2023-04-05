import styled from "styled-components";

import NewSpendingForm from "../FormsComponents/NewSpendingForm";

function EditorBox({ id, name, type, value, functionSpendingGet, setEditStatus, editStatus, edit }: any) {

  return (
    <>

      <ContainerEditor onClick={edit} editStatus={editStatus} />

      <BoxEditor editStatus={editStatus}>
        <NewSpendingForm model={"UPDATE"} functionSpendingGet={functionSpendingGet} setEditStatus={setEditStatus} value={value} type={type} name={name} id={id}/>
      </BoxEditor>  
      
    </>
  );
}

export default EditorBox;

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
`;
