import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import usePostSpeding from '../hooks/api/usePostSpending';
import useGetSpeding from '../hooks/api/useGetSpending';

type FormNewSpending = {
    name: string;
    value: number;
    type: string;
}

function NewSpendingForm( {functionSpendingGet}:any ) {
    const { functionSpendingPost } = usePostSpeding();
    const validationSchemaSingUp = Yup.object().shape({
      name: Yup.string().required('Fullname is required'),
      value: Yup.number().required('Email is required'),
      type: Yup.string().required('required').oneOf(["INPUT", "OUTPUT"]),
    });
  
  
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormNewSpending>({resolver: yupResolver(validationSchemaSingUp)});
  
    async function onSubmit(data: any) {
        console.log(data);
        await functionSpendingPost(data);
        await functionSpendingGet();
    };
  
    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input type="text" placeholder='Name' {...register('name')} />
            <div>{errors.name?.message}</div>
          </div>
          
          <div>
            <input type="number" placeholder='Value' {...register('value')} />
            <div>{errors.value?.message}</div>
          </div>

          <div>
          <select placeholder='Type' {...register("type")}>
                <option value="INPUT">Input</option>
                <option value="OUTPUT">Output</option>
            </select>
          </div>
  
          <div>
            <button type="submit"> Register </button>
            <button type="button" onClick={() => reset()}> Reset </button>
          </div>
        </form>
      </>
    );
  };
  
  export default NewSpendingForm;