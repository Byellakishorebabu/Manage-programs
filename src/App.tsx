import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ManagerProgram from "./pages/ManagePrograms";
import AddProgram from "./pages/AddProgramForm";
import Editprogram from "./pages/Editprogram";
import Duplicateprogram from "./pages/Duplicateprogram"
import ProgramName from "./pages/ProgramName"
import CourseSelection from "./pages/CourseSelection";

function App() {

  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ManagerProgram />} />
        <Route path="/AddProgramForm" element={<AddProgram />} />
        <Route path="/Editprogram/:id" element={<Editprogram />} />
        <Route path="/Duplicateprogram/:id" element={<Duplicateprogram />} />
        <Route path="/ProgramName/:id" element={<ProgramName />} />
        <Route path="/CourseSelection" element={<CourseSelection />} />
      </Routes>
    </Router>
  );
}

export default App;
