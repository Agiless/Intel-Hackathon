import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './components/LoginPage'; 
import Main from "./components/entry";

function App() {
  return (
    <Router>
      <Routes>
        <Route  path="/" element={<Main />} />
        <Route  path="/login" element={<LoginPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
