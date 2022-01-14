import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import React from "react";
import UserPage from "./UserPage";
import AdminPage from "./AdminPage";

/**
 * Calls the page components and changes the url to match your location.
 * Router enables us to have two different views without separate HTML files.
 * @returns
 */
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="header">
          <Link className="links" to="/">
            User
          </Link>
          <Link className="links" to="/admin">
            Admin
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<UserPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
