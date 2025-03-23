import React from "react";

const Footer = () => {
  // Get the current year to display in the footer
  const currentYear = new Date().getFullYear();

  // Return the Footer component
  return (
    // Footer container with styling
    <footer className="bg-secondary text-white py-4 mt-4">
      {/* Container to center the footer content */}
      <div className="container text-center">
        {/* Paragraph displaying the copyright information */}
        <p className="small mb-0">© {currentYear}. Library Admin Dashboard.</p>
      </div>
    </footer>
  );
};

export default Footer;