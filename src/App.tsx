import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ManagerProgram from "./pages/ManagePrograms";
import AddProgram from "./pages/AddProgramForm";
import Editprogram from "./pages/Editprogram";
import Duplicateprogram from "./pages/Duplicateprogram"
import ProgramName from "./pages/ProgramName"
import EditProgram from "./pages/EditProgram";
// import CourseSelection from "./pages/CourseSelection";
import BaseEdubotSidebar from "./pages/customcomponents/BaseEdubotSidebar";

function App() {

  const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
      <div className="flex h-screen">
        {/* Sidebar - hidden on mobile and medium screens, visible on large screens */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <BaseEdubotSidebar/>
        </div>
        
        {/* Main content area including top navbar */}
        <div className="flex-1 flex flex-col">
          {/* Fixed navbar */}
          <header className="h-16 bg-white shadow-sm flex items-center px-4 fixed top-0 left-0 right-0 z-10 ">
            <BaseEdubotSidebar />
          </header> 
  
          {/* Main content with fixed height */}
          <main className="flex-1 bg-white pt-16 overflow-y-auto hide-scrollbar"> {/* */}
            <div className="h-[calc(100vh-4rem)] p-4 md:p-4">
              {children}
            </div>
          </main>
        </div>
    </div>
  );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<BaseEdubotSidebar/>}/>
        <Route path="/managerprogram" element={<DashboardLayout><ManagerProgram /></DashboardLayout>} />
        <Route path="/AddProgramForm" element={<DashboardLayout><AddProgram /></DashboardLayout>} />
        <Route path="/Editprogram/:id" element={<DashboardLayout><Editprogram /></DashboardLayout>} />
        <Route path="/Duplicateprogram/:id" element={<DashboardLayout><Duplicateprogram/></DashboardLayout>} />
        <Route path="/ProgramName/:id" element={<DashboardLayout><ProgramName /></DashboardLayout>} />
        <Route path="/edit-program/:id" element={<DashboardLayout><EditProgram /></DashboardLayout>} />
        {/* <Route path="/CourseSelection" element={<CourseSelection />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
