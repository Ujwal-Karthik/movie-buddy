import React, { useState } from "react";
import Logo from "./Logo";

const Navbar = ({ children }) => {
  return (
    <div>
      <nav className="nav-bar">
        <Logo />
        {children}
      </nav>
    </div>
  );
};

export default Navbar;
