import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ChatButton from './ChatButton';

function Shell({ children }) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
      <ChatButton />
      <Footer />
    </div>
  );
}

export default Shell;