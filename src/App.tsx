import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainView from './pages/MainView';
import TestView from './pages/TestView';
import { Navigation } from "./components/Navigation"

function App() {
  return (
    <BrowserRouter>
        <Navigation/>
        <Routes>
            <Route path="/:id_evaluacion/:id_usuario" element={<MainView/>} />
            <Route path="/:id_evaluacion/:id_usuario/test" element={<TestView/>} />
        </Routes>  
    </BrowserRouter>
  );
}

export default App;
