import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import usePostSpeding from "../hooks/api/usePostSpending";
import usePutSpeding from "../hooks/api/usePutSpending";
import useDeleteSpeding from "../hooks/api/useDeleteSpending";
import styled from "styled-components";
import { formaterValueNumber, normalizeValueNumber } from "../masks/mask";
import { valueFormater } from "../utils/valueFormater";

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
      <FormContainer onSubmit={handleSubmit(onSubmit)}>

        <BoxInputs>
          <div>
            <input type="text" value={nameInput} placeholder="Name" {...register("name", { onChange: (e) => setNameInput(e.target.value) })} />
            <div>{errors.name?.message}</div>
          </div>

          <div>
            <input type="text"  value={valueInput} placeholder="Value" {...register("value", { onChange: (e) => editMask(e.target.value) })} />
            <div>{errors.value?.message}</div>
          </div>
        </BoxInputs>

        <div>
          <select placeholder="Type" value={typeInput} {...register("type", { onChange: (e) => setTypeInput(e.target.value) })}>
            <option value="INPUT">Input</option>
            <option value="OUTPUT">Output</option>
          </select>
        </div>

        <div>
          <button type="submit" > Register </button>
          {model === "CREATED" && (<button type="button" onClick={() => resetInputs()}>Cancelar</button>)}
          {model === "UPDATE" && (<button type="button" onClick={deleteSpending}>Delete</button>)}
        </div>
      </FormContainer>
    </>
  );
}

export default NewSpendingForm;

const FormContainer = styled.form`
  width: 100%;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: red;
  
  input{
    width: 100%;
    height: 50px;
    padding: 5px;
    box-sizing: border-box;

    font-size: 15px;
    border-radius: 5px;
  }
`;
const BoxInputs = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-around;

`
