import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './components/LoginPage'; 
import Main from "./components/entry";
import Page from "./components/BotPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route  path="/" element={<Main />} />
        <Route  path="/login" element={<LoginPage />} />
        <Route  path="/main" element={<Page />} />
      </Routes>
    </Router>
  );
}

export default App;
