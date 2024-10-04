import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './components/LoginPage'; 
import Main from "./components/entry";
import Page from "./components/BotPage";
import Sales from "./components/Sales";
import Map from "./components/map";
import Chat from "./components/chatter";

function App() {
  return (
    <Router>
      <Routes>
        <Route  path="/login" element={<LoginPage />} />
        <Route  path="/" element={<Main />} />
        <Route  path="/main" element={<Page />} />
        <Route  path="/sales" element={<Sales />} />
        <Route  path="/map" element={<Map />} />
        <Route  path="/chat" element={<Chat />} />
      </Routes>
    </Router>

  );
  
  
}

export default App;
