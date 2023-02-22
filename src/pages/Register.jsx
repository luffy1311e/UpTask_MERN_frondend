import { useState } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import Alerta from '../components/Alerta';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const { msg } = alerta;

  const handleSubmit = async e => {
    e.preventDefault();

    if ([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({
        msg: 'Las contraseña no son iguales',
        error: true,
      });
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: 'La contraseña es muy corta, agrega minimo 6 caracteres',
        error: true,
      });
      return;
    }

    setAlerta({});

    // Crear el Usuario en la API
    try {
      const { data } = await clienteAxios.post('/usuarios', {
        nombre,
        email,
        password,
      });
      setAlerta({
        msg: data.msg,
        error: false,
      });

      setNombre('');
      setEmail('');
      setPassword('');
      setRepetirPassword('');
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>
        Crea tu cuenta y administra tus <span className='text-slate-700'>proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}
      <form onSubmit={handleSubmit} className='my-10 bg-white shadow rounded-lg px-10 py-5'>
        <div className='my-5'>
          <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor='nombre'>
            Nombre
          </label>
          <input
            type='text'
            placeholder='Tu Nombre'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            id='nombre'
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>
        <div className='my-5'>
          <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor='email'>
            Correo
          </label>
          <input
            type='email'
            placeholder='Correo de Resgistro'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            id='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className='my-5'>
          <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor='password'>
            Contraseña
          </label>
          <input
            type='password'
            placeholder='Contraseña de Resgistro'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            id='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className='my-5'>
          <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor='password2'>
            Repetir Contraseña
          </label>
          <input
            type='password'
            placeholder='Repetir tu contraseña'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            id='password2'
            value={repetirPassword}
            onChange={e => setRepetirPassword(e.target.value)}
          />
        </div>
        <input
          type='submit'
          value='Crear Cuenta'
          className='bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
        />
      </form>
      <nav className='lg:flex lg:justify-between'>
        <Link to='/' className='block text-center my-5 text-slate-500 uppercase text-sm'>
          Ya tienes una cuenta? Inicia sesión
        </Link>
        <Link
          to='/olvide-password'
          className='block text-center my-5 text-slate-500 uppercase text-sm'>
          Olvide mi Contraseña
        </Link>
      </nav>
    </>
  );
};

export default Register;
