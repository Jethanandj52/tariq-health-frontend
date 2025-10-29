import React from "react";
import { Routes, Route } from "react-router-dom"; // ✅ only Routes/Route, no Router

// 🧱 Layouts & Core
import Layout from "./components/Layout/Layout";

// 👨‍👩‍👧‍👦 Family Components
import FamilyMemberList from "./components/Home/FamilyMemberList";
import MemberDetail from "./components/Home/MemberDetail.jsx";

// 🔐 Auth Components
import Login from "./components/Login/Login.jsx";
import SignUp from "./components/Login/SignUp.jsx";
import Forget from "./components/Login/Forget.jsx";
import ResetPassword from "./components/Login/ResetPassword.jsx";

// 🏠 Home Pages
import Home from "./components/Home/Home.jsx";
import About from "./components/Home/About.jsx";
import Contact from "./components/Home/Contact.jsx";
 
import UploadReport from "./components/Home/UploadReport.jsx";

// 🧱 Dashboard (Admin Panel)
import DashboardLayout from "./components/Dashboard/DashboardLayout.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import AllUser from "./components/Dashboard/AllUser.jsx";
import DashboardReports from "./components/Dashboard/Reports.jsx";
import AddDoctor from "./components/Dashboard/AddDoctor.jsx";

// 🔐 Route Guards
import ProtectedRoute from "./components/Home/ProtectedRoute.jsx";

// 🧁 Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Routes>
        {/* 🔓 Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* 🟢 Protected Routes (Layout ke sath) */}
        <Route element={<Layout />}>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
     
          <Route path="/report" element={<UploadReport />} />
          <Route path="/family" element={<FamilyMemberList />} />
        <Route path="/member/:id" element={<MemberDetail />} />
        </Route>

        {/* 👨‍👩‍👧‍👦 Family Member Detail */}

        {/* 🔵 Dashboard / Admin Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="allUsers" element={<AllUser />} />
          <Route path="addDoctor" element={<AddDoctor />} />
          <Route path="reports" element={<DashboardReports />} />
        </Route>
      </Routes>

      {/* 🍞 Toast Notifications */}
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default App;
