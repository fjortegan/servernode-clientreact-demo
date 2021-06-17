import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';

import '../components/css/login.css';


function Login() {
  const {register, handleSubmit, formState: { errors }} = useForm();

  const onSubmit = (data) => {
      console.log(data);    
  };
  

  return (
    <Fragment>

      <div className="login">
          <h2>¿Tienes una cuenta en <span className="trends">TRENDS</span>?</h2>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <h3>Inicia sesión</h3>
            <p>Rellena los formularios con tus credenciales.</p>
            <label htmlFor="name">Usuario:</label>
            <input type="text" name="name" autoComplete="off" placeholder="Introduce tu usuario"              
            {...register('name',{
               required: true,
               maxLength: 15,
               minLength:4
             })}></input>
            {errors.name && errors.name.type === "required" && <p className="error">Este campo es obligatorio.</p>}
            {errors.name && errors.name.type === "maxLength" && <p className="error">Solo se permite 15 caracteres como máximo.</p>}
            {errors.name && errors.name.type === "minLength" && <p className="error">Solo se permite 4 caracteres como mínimo.</p>}
            <p>{errors.message && errors.name.message}</p>

            <label htmlFor="name">Contraseña:</label>
            <input type="text" name="password" autoComplete="off" placeholder="Introduce tu contraseña"
            {...register('password',{
               required: true,
               pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
             })}></input>
            {errors.password && errors.password.type === "required" && <p className="error">Este campo es obligatorio.</p>}
            {errors.password && errors.password.type === "pattern" && <p className="error">Tu contraseña debe tener al menos: un número, una letra minúscula, una letra mayúscula y al menos 8 caracteres. </p>}
            <input type="submit" value="Acceder" />
          </form>
          
    </div>

    </Fragment>
  );
}

export default Login;