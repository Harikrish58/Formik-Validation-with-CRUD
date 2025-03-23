import { Link } from "react-router-dom";

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  // Function to toggle the sidebar's collapsed state
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  // Return the Sidebar component
  return (
    // Sidebar container with dynamic styling based on the collapsed state
    <div
      className={`bg-primary text-white ${isCollapsed ? "w-auto" : "w-100"}`}
      style={{
        minWidth: isCollapsed ? "60px" : "200px",
        transition: "width 0.3s",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      {/* Header section of the sidebar */}
      <div className="p-3 d-flex justify-content-between align-items-center">
        {/* Display the title only when the sidebar is expanded */}
        {!isCollapsed && <h4 className="mb-0">Library Admin</h4>}
        {/* Button to toggle the sidebar's collapsed state */}
        <button className="btn btn-light btn-sm" onClick={toggleSidebar}>
          {/* Icon that changes based on the sidebar's collapsed state */}
          <i
            className={`bi ${
              isCollapsed ? "bi-chevron-right" : "bi-chevron-left"
            }`}
          ></i>
        </button>
      </div>

      {/* Navigation links within the sidebar */}
      <ul className="nav flex-column">
        {/* Link to the Library page */}
        <li className="nav-item">
          <Link
            className="nav-link text-white d-flex align-items-center"
            to="/"
          >
            {/* Icon for the Library link */}
            <i className="bi bi-book me-2"></i>
            {/* Display the link text only when the sidebar is expanded */}
            {!isCollapsed && "Library"}
          </Link>
        </li>
        {/* Link to the Create page */}
        <li className="nav-item">
          <Link
            className="nav-link text-white d-flex align-items-center"
            to="/create"
          >
            {/* Icon for the Create link */}
            <i className="bi bi-plus-circle me-2"></i>
            {/* Display the link text only when the sidebar is expanded */}
            {!isCollapsed && "Create"}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;