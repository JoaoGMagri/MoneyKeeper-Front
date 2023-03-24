import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import usePostSpeding from "../hooks/api/usePostSpending";
import usePutSpeding from "../hooks/api/usePutSpending";
import useDeleteSpeding from "../hooks/api/useDeleteSpending";

type FormNewSpending = {
  name: string;
  value: number;
  type: string;
};

function NewSpendingForm({
  model,
  functionSpendingGet,
  value,
  name,
  type,
  id,
  setEditStatus
}: any) {
  
  const { functionSpendingPost } = usePostSpeding();
  const { functionSpendingPut } = usePutSpeding();
  const { functionSpendingDelete } = useDeleteSpeding()

  const validationSchemaSingUp = Yup.object().shape({
    name: Yup.string().required("name is required"),
    value: Yup.number().required("value is required"),
    type: Yup.string().required("required").oneOf(["INPUT", "OUTPUT"]),
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormNewSpending>({
    resolver: yupResolver(validationSchemaSingUp),
  });

  async function onSubmit(data: any) {
    if (model === "CREATED") {
      await functionSpendingPost(data);
      await functionSpendingGet();
    } else {
      await functionSpendingPut({ ...data, id: id });
      await functionSpendingGet();
      setEditStatus(false);
    }
  }

  async function deleteSpending() {
    await functionSpendingDelete({id});
    await functionSpendingGet();
    setEditStatus(false);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            placeholder="Name"
            {...register("name")}
          />
          <div>{errors.name?.message}</div>
        </div>

        <div>
          <input
            type="number"
            placeholder="Value"
            {...register("value")}
          />
          <div>{errors.value?.message}</div>
        </div>

        <div>
          <select placeholder="Type" {...register("type")}>
            <option value="INPUT">Input</option>
            <option value="OUTPUT">Output</option>
          </select>
        </div>

        <div>
          <button type="submit"> Register </button>
          {model === "CREATED" && (<button type="button" onClick={() => reset()}>Reset</button>)}
          {model === "UPDATE" && (<button type="button" onClick={deleteSpending}>Delete</button>)}
        </div>
      </form>
    </>
  );
}

export default NewSpendingForm;
