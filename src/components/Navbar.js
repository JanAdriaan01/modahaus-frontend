import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <Logo />
      <div style={{ display: 'flex', gap: '2rem' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>Home</Link>
        <Link to="/products" style={{ textDecoration: 'none', color: '#333' }}>Products</Link>
      </div>
    </nav>
  );
};

export default Navbar;