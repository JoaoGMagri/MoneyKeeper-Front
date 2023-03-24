import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

import sessionsHooks from '../hooks/api/useSession';
import errorsMensage from '../utils/erros';
import { PropsAuthForm, UserSubmitForm } from '../protocols';

function AuthForm( props: PropsAuthForm ) {
  const navigate = useNavigate()
  const { functionSignUp } = sessionsHooks.useSignUp();
  const { functionSignIn } = sessionsHooks.useSignIn();

  const validationSchemaSingUp = Yup.object().shape({
    fullname: Yup.string().required('Fullname is required'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters').max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string().required('Confirm Password is required').oneOf([Yup.ref('password')], 'Confirm Password does not match'),
  });

  const validationSchemaSingIn = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters').max(40, 'Password must not exceed 40 characters'),
  });

  let schema = validationSchemaSingIn

  if(props.state) schema = validationSchemaSingUp

  const { register, handleSubmit, reset, formState: { errors } } = useForm<UserSubmitForm>({resolver: yupResolver(schema)});

  async function onSubmit(data: UserSubmitForm) {
    if ( props.state ) {

      const resp = await functionSignUp(data.email, data.password, data.fullname);
      if(resp?.error) errorsMensage(resp.status);

    } else {

      const resp = await functionSignIn(data.email, data.password);
      if (resp?.error) {
        console.log(resp)
        errorsMensage(resp.status);
      } else {
        navigate('/home');
        console.log(resp)
        localStorage.setItem("token", resp.response.token);
      }

    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {props.state && 
          <div>
            <input type="text" placeholder='Full Name' {...register('fullname')} />
            <div>{errors.fullname?.message}</div>
          </div>
        }
        
        <div>
          <input type="text" placeholder='Email' {...register('email')} />
          <div>{errors.email?.message}</div>
        </div>

        <div>
          <input type="password" placeholder='Password' {...register('password')} />
          <div>{errors.password?.message}</div>
        </div>
        
        {props.state &&
          <div>
            <input type="password" placeholder='Confirm Password' {...register('confirmPassword')} />
            <div> {errors.confirmPassword?.message} </div>
          </div>
        }

        <div>
          <button type="submit"> Register </button>
          {props.state && <button type="button" onClick={() => reset()}> Reset </button> }
        </div>
      </form>
    </>
  );
};

export default AuthForm;
