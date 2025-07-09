import React from 'react';
import Background from './components/Background';
import Header from './components/Header';
import LoanForm from './components/LoanForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen relative">
      <Background />
      <div className="relative z-10">
        <Header />
        <main className="px-6">
          <LoanForm />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;