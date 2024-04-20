import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import ApexChart from './pages/ApexChart';
import Header from './components/Header';
import NoPages from './pages/NoPages';

function App() {

  return (
    <>
    <Header></Header>
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/apexchart/:id' element={<ApexChart></ApexChart>}></Route>
      <Route path='*' element={<NoPages></NoPages>}></Route>
    </Routes>
    </>
  )
}

export default App
