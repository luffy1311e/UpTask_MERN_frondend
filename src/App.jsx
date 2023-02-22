import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { ProyectosProvider } from './context/ProyectosProvider';
import AuthLayout from './layouts/AuthLayout';
import RutaProtegida from './layouts/RutaProtegida';
import ConfirmAccount from './pages/ConfirmAccount';
import ForgorPassword from './pages/ForgorPassword';
import Login from './pages/Login';
import NewPassword from './pages/NewPassword';
import Register from './pages/Register';
import Proyectos from './pages/Proyectos';
import NuevoProyecto from './pages/NuevoProyecto';
import EditarProyecto from './pages/EditarProyecto';
import NuevoColaborador from './pages/NuevoColaborador';
import Proyecto from './pages/Proyecto';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProyectosProvider>
          <Routes>
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path='registrar' element={<Register />} />
              <Route path='olvide-password' element={<ForgorPassword />} />
              <Route path='olvide-password/:token' element={<NewPassword />} />
              <Route path='confirmar/:id' element={<ConfirmAccount />} />
            </Route>
            <Route path='/proyectos' element={<RutaProtegida />}>
              <Route index element={<Proyectos />} />
              <Route path='crear-proyecto' element={<NuevoProyecto />} />
              <Route path='nuevo-colaborador/:id' element={<NuevoColaborador />} />
              <Route path=':id' element={<Proyecto />} />
              <Route path='editar/:id' element={<EditarProyecto />} />
            </Route>
          </Routes>
        </ProyectosProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
