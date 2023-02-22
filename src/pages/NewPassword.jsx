import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import Alerta from '../components/Alerta';

const NewPassword = () => {
  const [tokenValido, setTokenValido] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState('');
  const [passwordModificado, setPasswordModificado] = useState(false);

  const params = useParams();
  const { token } = params;
  const { msg } = alerta;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/usuarios/olvide-contrasena/${token}`);
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    comprobarToken();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    if (password.length < 6) {
      setAlerta({
        msg: 'La Contraseña debe ser minimo de 6 caracteres',
        error: true,
      });
      return;
    }

    try {
      const url = `/usuarios/olvide-contrasena/${token}`;
      const { data } = await clienteAxios.post(url, { password });
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setPasswordModificado(true);
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
        Reestablece tu contraseña y no pierdas acceso a tus{' '}
        <span className='text-slate-700'>proyectos</span>
      </h1>
      {msg && <Alerta alerta={alerta} />}
      {tokenValido && (
        <form className='my-10 bg-white shadow rounded-lg px-10 py-5' onSubmit={handleSubmit}>
          <div className='my-5'>
            <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor='password'>
              Nueva Contraseña
            </label>
            <input
              type='password'
              placeholder='Escribe tu Nueva Contraseña'
              className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
              id='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <input
            type='submit'
            value='Guardar nueva Contraseña'
            className='bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
          />
        </form>
      )}
      {passwordModificado && (
        <Link to='/' className='block text-center my-5 text-slate-500 uppercase text-sm'>
          Inicia sesión
        </Link>
      )}
    </>
  );
};

export default NewPassword;
