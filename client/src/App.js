import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Transport from '../src/Components/Transport';
import Shipment from '../src/Components/Shipment';
import Vechicle from '../src/Components/Vehicle';
import Materials from '../src/Components/Material';
import Home from '../src/Components/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/transport' element={<Transport />} />
        <Route path="/shipment" element={<Shipment />} />
        <Route path="/vehicle" element={<Vechicle />} />
        <Route path="/material" element={<Materials />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
