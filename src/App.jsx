import Login from "./components/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import SignUp from "./components/SignUp.jsx";
import Main from "./components/index.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="min-h-[100vh] bg-gradient-to-b from-[#9B5DE5] via-[#845EC2] to-[#D65DB1]">
      <Router>
        <Navbar/>
        <Routes >
           <Route path="/" element={<Main/>}/>
           <Route path="/signup" element={<SignUp/>}/>
           <Route path="/login" element={<Login/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
