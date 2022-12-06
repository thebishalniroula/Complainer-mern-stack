import "./App.css";
import Nav from "./components/nav/nav";
import Cards from "./components/rolecards/cards";
import Form from "./components/loginForm/form";
import { Routes, Route } from "react-router-dom";
import Complains from "./components/complains/complains";
import NewComplain from "./components/newComplain/newCompplain";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Nav />
      </header>

      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/login" element={<Form />} />
        <Route path="/admin" element={<Complains />} />
        <Route path="/complain" element={<NewComplain />} />
      </Routes>
    </div>
  );
}

export default App;
