import logo from './logo.svg';
import './App.css';
import styles from './styles/styles.css';
import { BrowserRouter, Routes , Route} from 'react-router-dom';
import Barra from './Componentes/navbar';
import Panel from './Componentes/panel';
import Categorias from './Componentes/Categorias';
import Usuarios from  './Componentes/Usuarios';
import Roles from './Componentes/Roles';
import Clientes from './Componentes/Clientes';
import Facturas from './Componentes/Facturas';
import Productos from './Componentes/Productos';
import Ventas from './Componentes/Ventas';

function App() {
 
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/*' element={<Barra></Barra>}></Route>
    </Routes>
    <Routes>
      <Route path='/categorias' element={<Categorias></Categorias>}></Route>
    </Routes>
    <Routes>
      <Route path='/usuarios' element={<Usuarios/>}></Route>
    </Routes>
    <Routes>
      <Route path='/roles' element={<Roles/>}></Route>
    </Routes>
    <Routes>
      <Route path='/clientes' element={<Clientes/>}></Route>
    </Routes>
    <Routes>
      <Route path='/facturas' element={<Facturas/>}></Route>
    </Routes>
    <Routes>
      <Route path='/productos' element={<Productos/>}></Route>
    </Routes>
    <Routes>
      <Route path='/ventas' element={<Ventas/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
