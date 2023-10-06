import React from "react";
import AppRoutes from "../routes/AppRoutes";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";

const App = () => {
  return (
    <div className="app">
      <Header />

      <div className="ccontainer">
        <Sidebar />
        <AppRoutes />
      </div>

      <Footer />
    </div>
  );
};

export default App;
