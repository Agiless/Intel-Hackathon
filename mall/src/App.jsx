import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './components/LoginPage'; 
import Main from "./components/entry";
import Page from "./components/BotPage";
import Sales from "./components/Sales";
import Map from "./components/map";
import Mappper from "./components/blender";

function App() {
  return (
    <Router>
      <Routes>
        <Route  path="/" element={<Main />} />
        <Route  path="/login" element={<LoginPage />} />
        <Route  path="/main" element={<Page />} />
        <Route  path="/sales" element={<Sales />} />
        <Route  path="/map" element={<Map />} />
        <Route  path="/map" element={<Map />} />
      </Routes>
    </Router>
  );

}

export default App;
