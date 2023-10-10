import React from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import AppRoutes from "../routes/AppRoutes.jsx";

const App = () => {
  return (
    <div className="app">
      <Header />

      <div className="container">
        <Sidebar />
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
};

export default App;
