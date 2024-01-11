import React from "react";
import Header from "./partial/Header";
import Footer from "./partial/Footer";
import "./partial/App.css";
import "./partial/Responsive.css";
import Mobilemenu from "../../component/mobilemenu";
const Layout = ({ children }) => {
  return (
    <>
      <Mobilemenu />
      <Header />
      {children}
      <Footer />
    </>
  );
};
export default Layout;
