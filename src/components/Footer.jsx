import React from 'react';
import Logo from './Logo';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Logo />
            <p className="mt-4 text-gray-300 text-sm">
              Fabrication & shipment of aluminium window & door systems. 
              SANS compliant. Coastal & inland specs.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/products" className="hover:text-white transition-colors">Products</a></li>
              <li><a href="/order" className="hover:text-white transition-colors">Place an Order</a></li>
              <li><a href="/compliance" className="hover:text-white transition-colors">Compliance</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="text-sm text-gray-300 space-y-2">
              <p>Johannesburg</p>
              <p>+27 (0) 61 193 3931</p>
              <p>info@modahaus.co.za</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Modahaus</h3>
            <p className="text-sm text-gray-300">Global</p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 Modahaus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;