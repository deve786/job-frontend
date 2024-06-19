
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Admin from './Pages/Admin';
import Job_detail from './Pages/Job_detail';
import Applied from './Pages/Applied';

function App() {
  return (
    <div className="App flex flex-col justify-between min-h-screen" >
      <div>
        <Header/>
        <Routes>
        
          
          
          <Route path='/' element={<Home />}></Route>
          <Route path='/admin' element={<Admin />}></Route> 
          <Route path='/job-detail/:id' element={<Job_detail />} />
          <Route path='/applied' element={<Applied />} />

          
        </Routes>
      </div>
      <Footer />
    </div>
   
  );
}

export default App;
