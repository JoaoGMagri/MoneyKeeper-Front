import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import usePostSpeding from "../../hooks/api/usePostSpending";
import usePutSpeding from "../../hooks/api/usePutSpending";
import useDeleteSpeding from "../../hooks/api/useDeleteSpending";
import styled, { keyframes } from "styled-components";
import { formaterValueNumber, normalizeValueNumber } from "../../masks/mask";
import { valueFormater } from "../../utils/valueFormater";

type FormNewSpending = {
  name: string;
  value: number;
  type: string;
};

function NewSpendingForm({ model, functionSpendingGet, value="0", name="", type="INPUT", id, setEditStatus }: {model:string, functionSpendingGet: Function, value?: string, name?:string, id?:number, type?:string, setEditStatus: Function}) {
  value = valueFormater(value);
  
  const [valueInput, setValueInput] = useState(value === "0,00" ? undefined : value);
  const [nameInput, setNameInput] = useState(name);
  const [typeInput, setTypeInput] = useState(type);

  const { functionSpendingPost } = usePostSpeding();
  const { functionSpendingPut } = usePutSpeding();
  const { functionSpendingDelete } = useDeleteSpeding()

  const validationSchemaSpending = Yup.object().shape({
    name: Yup.string().required("name is required"),
    value: Yup.string().required("value is required"),
    type: Yup.string().required("required").oneOf(["INPUT", "OUTPUT"]),
  });

  const { handleSubmit, register, reset, formState: { errors } } = useForm<FormNewSpending>({ resolver: yupResolver(validationSchemaSpending) });


  async function onSubmit(data: any) {
    const newData = {
      name: data.name,
      value: formaterValueNumber(data.value),
      type: data.type
    }
    console.log(newData);
    if (model === "CREATED") {
      await functionSpendingPost(newData);
      await functionSpendingGet();
      resetInputs();
    } else {
      await functionSpendingPut({ ...newData, id: id });
      await functionSpendingGet();
      setEditStatus(false);
    }
  }

  async function deleteSpending() {
    await functionSpendingDelete({id});
    await functionSpendingGet();
    setEditStatus(false);
  }

  function resetInputs() {
    setValueInput("");
    setNameInput("");
    reset({name, value: undefined});
  }

  function editMask(value:string) {
    const newValue = normalizeValueNumber(value);
    setValueInput(newValue);
  }

  return (
    <>
      <ContainerForm onSubmit={handleSubmit(onSubmit)}>

        <BoxInputs>

          <Group>
            <Input required type="text" className="input" value={nameInput} {...register("name", { onChange: (e) => setNameInput(e.target.value) })} />
            <Highlight className="highlight" />
            <Bar className="bar" />
            <Label>Name</Label>
            <MensagerError>{errors.name?.message}</MensagerError>
          </Group>

          <Group>
            <Input required type="text" className="input" value={valueInput} {...register("value", { onChange: (e) => editMask(e.target.value) })} />
            <Highlight className="highlight" />
            <Bar className="bar" />
            <Label>Valor</Label>
            <MensagerError>{errors.value?.message}</MensagerError>
          </Group>

        </BoxInputs>

        <BoxSelect>
          <Select placeholder="Type" value={typeInput} {...register("type", { onChange: (e) => setTypeInput(e.target.value) })}>
            <option value="INPUT">Lucro</option>
            <option value="OUTPUT">Gastos</option>
          </Select>
        </BoxSelect>

        <BoxButtons>
          <Button type="submit" > Register </Button>
          {model === "CREATED" && (<Button type="button" onClick={() => resetInputs()}>Cancelar</Button>)}
          {model === "UPDATE" && (<Button type="button" onClick={deleteSpending}>Delete</Button>)}
        </BoxButtons>
      </ContainerForm>
    </>
  );
}

export default NewSpendingForm;

const ContainerForm = styled.form`
  width: 100%;
  height: 100%;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const BoxInputs = styled.div`
  width: 100%;
  height: 90px;

  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const BoxSelect = styled.div`
  width: 100%;
  height: 90px;

  display: flex;
  align-items: flex-start;
  justify-content: space-around;
`
const BoxButtons = styled.div`
  width: 100%;

  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;


/* Estilo do select */
const Select = styled.select`
  width: 200px;
  height: 40px;
  font-size: 16px;
  color: #999;
  background: transparent;
  border: none;
  border-bottom: 1px solid #515151;
`
/* Estilo dos inputs */
const highlightAnimation = keyframes`
  from {
    background: #A36041;
  }
  to {
    width: 0;
    background: transparent;
  }
`;
const Input = styled.input`
  font-size: 16px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 200px;
  border: none;
  border-bottom: 1px solid #515151;
  background: transparent;

  &:focus {
    outline: none;
  }

  &:focus ~ label,
  &:valid ~ label {
    top: -20px;
    font-size: 14px;
    color: #A36041;
  }

  &:focus ~ .bar::before,
  &:focus ~ .bar::after {
    width: 50%;
  }

  &:focus ~ .highlight {
    animation: ${highlightAnimation} 0.3s ease;
  }
`;
const Group = styled.div`
  position: relative;
`;
const Label = styled.label`
  color: #999;
  font-size: 18px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
`;
const Bar = styled.span`
  position: relative;
  display: block;
  width: 200px;

  &::before,
  &::after {
    content: '';
    height: 2px;
    width: 0;
    bottom: 1px;
    position: absolute;
    background: #A36041;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }

  &::before {
    left: 50%;
  }

  &::after {
    right: 50%;
  }
`;
const Highlight = styled.span`
  position: absolute;
  height: 60%;
  width: 100px;
  top: 25%;
  left: 0;
  pointer-events: none;
  opacity: 0.5;
`;
const MensagerError = styled.div`
  color: #FF0000;
  margin-bottom: 10px;
  margin-top: 5px;
`;

/* Estilo dos buttons */
const Button = styled.button`
  width: 10em;
  position: relative;
  height: 2.5em;
  border: 3px ridge #A36041;
  outline: none;
  background-color: transparent;
  color: #999;
  transition: 1s;
  border-radius: 0.3em;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;

  ::after {
    content: "";
    position: absolute;
    top: -10px;
    left: 3%;
    width: 95%;
    height: 40%;
    background-color: #2A2E31;
    transition: 0.5s;
    transform-origin: center;
  }

  ::before {
    content: "";
    transform-origin: center;
    position: absolute;
    top: 80%;
    left: 3%;
    width: 95%;
    height: 40%;
    background-color: #2A2E31;
    transition: 0.5s;
  }

  :hover::before, :hover::after {
    transform: scale(0)
  }

  :hover {
    box-shadow: inset 0px 0px 25px #A36041;
  }
`;