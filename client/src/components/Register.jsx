import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';

import '../components/css/register.css';

// HOOK FORM 

function Register() {

  const {register, handleSubmit, formState: {errors}} = useForm();

  const onSubmit = (data) => {
      console.log(data);    
  };
    return (
      <Fragment>
        <div className="register">
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <h3>Regístrate en <span className="trends">TRENDS</span></h3>
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
  
              <label htmlFor="email">E-mail:</label>
              <input type="email" name="email" placeholder="Introduce tu contraseña"             
              {...register('email',{
                 required: true,
                 pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
               })}></input>
              {errors.email && errors.email.type === "required" && <p className="error">Este campo es obligatorio.</p>}
              {errors.email && errors.email.type === "pattern" && <p className="error">El e-mail introducido no es válido.</p>}
  
              <label htmlFor="password">Contraseña:</label>
              <input type="text" name="password" placeholder="Introduce tu contraseña"{...register('password',{
                 required: true,
                 pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
               })}></input>
              {errors.password && errors.password.type === "required" && <p className="error">Este campo es obligatorio.</p>}
              {errors.password && errors.password.type === "pattern" && <p className="error">Tu contraseña debe tener al menos: un número, una letra minúscula, una letra mayúscula y al menos 8 caracteres. </p>}
  
              <input type="submit" value="Crear cuenta" />
            </form>
      </div>
      </Fragment>
    );
}

export default Register;
