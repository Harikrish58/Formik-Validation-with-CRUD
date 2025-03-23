import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Library from "./Pages/Library";
import Create from "./Pages/Create";
import Edit from "./Pages/Edit";
import Footer from "./Components/Footer";

const App = () => {
  // State for sidebar collapse
  const [isCollapsed, setIsCollapsed] = useState(true);
  const sidebarWidth = isCollapsed ? "60px" : "200px";

  return (
    <BrowserRouter>
      {/* Sidebar Component */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Main Content Area */}
      <div className="flex-grow-1" style={{ marginLeft: sidebarWidth }}>
        <div className="p-4">
          {/* Routing Configuration */}
          <Routes>
            <Route path="/" element={<Library />} />
            <Route path="/create" element={<Create />} />
            <Route path="/edit/:type/:id" element={<Edit />} />
          </Routes>
        </div>
        {/* Footer Component */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;