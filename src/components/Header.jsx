import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';

function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

function NavItem({ to, children }) {
  return (
    <NavLink
      end
      className={({ isActive }) =>
        classNames(
          "px-3 py-2 text-sm font-medium transition-colors hover:text-blue-600",
          isActive ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-700"
        )
      }
      to={to}
    >
      {children}
    </NavLink>
  );
}

function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Logo />
            <nav className="hidden md:flex space-x-8 ml-10">
              <NavItem to="/">Home</NavItem>
              <NavItem to="/products">Products</NavItem>
              <NavItem to="/gallery">Gallery</NavItem>
              <NavItem to="/compliance">Compliance</NavItem>
              <NavItem to="/contact">Contact</NavItem>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
              Get Quote
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;