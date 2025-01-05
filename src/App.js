import './App.css';
import Home from './Pages/Home';
import Help from './Pages/Help';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CourseProvider } from './Components/CourseContext';

function App() {
  return (
    <Router>
      <CourseProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/help" element={<Help />} />
      </Routes>
      </CourseProvider>
    </Router>
  );
}

export default App;
