import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './Components/Navar.jsx';
import Crud1 from './Pages/Crud1.jsx';
import Crud2 from './Pages/Crud2.jsx';
import Crud3 from './Pages/Crud3.jsx';
import './App.css';

function App() {
  const location = useLocation();
  const [section, setSection] = useState('theme-0');

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/crud2')) setSection('theme-1');
    else if (path.includes('/crud3')) setSection('theme-2');
    else setSection('theme-0');
  }, [location.pathname]);

  return (
    <div className={`app-container ${section}`}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/crud1" />} />
        <Route path="/crud1" element={<Crud1 />} />
        <Route path="/crud2" element={<Crud2 />} />
        <Route path="/crud3" element={<Crud3 />} />
        <Route path="*" element={<Navigate to="/crud1" />} />
      </Routes>
    </div>
  );
}

export default App;
