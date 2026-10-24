
import React from 'react';
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import EmployeeForm from "./pages/EmployeeForm.jsx";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="container py-4 py-md-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employee-form" element={<EmployeeForm />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <footer className="app-footer py-3">
        <div className="container text-center">
          <small>Employee Dashboard</small>
        </div>
      </footer>
    </div>
  );
}

export default App;
