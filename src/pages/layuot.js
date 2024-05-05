import React from 'react';
import Navbar from '../../Components/Cliente/NavBar/navBar';

function Layout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;