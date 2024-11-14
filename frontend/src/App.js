import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Compare from "./pages/Compare";
import CryptoNews from "./pages/CryptoNews";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/news/:symbol" element={<CryptoNews />} />
      </Routes>
    </Router>
  );
}

export default App;
