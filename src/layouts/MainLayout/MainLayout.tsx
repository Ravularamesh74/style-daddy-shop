// MainLayout.tsx
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;