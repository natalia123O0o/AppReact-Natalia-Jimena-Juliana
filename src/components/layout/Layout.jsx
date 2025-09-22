import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Contenido principal */}
      <main className="p-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;