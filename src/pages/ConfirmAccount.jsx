import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import Alerta from '../components/Alerta';

const ConfirmAccount = () => {
  const [alerta, setAlerta] = useState({});
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const params = useParams();
  const { id } = params;
  const { msg } = alerta;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/usuarios/confirmar/${id}`;
        const { data } = await clienteAxios(url);

        setAlerta({
          msg: data.msg,
          error: false
        });
        setCuentaConfirmada(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        });
      }
    };
    confirmarCuenta();
  }, []);

  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>
        Confirma tu cuenta y Comienza a crear tus <span className='text-slate-700'>proyectos</span>
      </h1>
      <div className='mt-20 md:mt-10 shadow-lg py-10 rounded-xl bg-white'>
        {msg && <Alerta alerta={alerta} />}
        {cuentaConfirmada && (
          <Link to='/' className='block text-center my-5 text-slate-500 uppercase text-sm'>
            Inicia sesión
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmAccount;
