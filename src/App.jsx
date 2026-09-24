import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Existing App Components (renamed to CertifyStudio)
import CertifyStudio from './CertifyStudio';
import VerificationPage from './pages/Verification';

import StartupCheck from './components/StartupCheck';
import Onboarding from './pages/Onboarding';



function App() {
  const navigate = (path) => {
    window.location.href = path.startsWith('/') ? path : `/${path}`;
  };

  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <StartupCheck>
        <Routes>
          {/* Main CertLock Routes */}
          <Route path="/" element={<CertifyStudio />} />
          <Route path="/how-it-works" element={<Onboarding onNavigate={navigate} />} />
          <Route path="/verify" element={<VerificationPage onBack={() => navigate('/')} />} />



      </Routes>
      </StartupCheck>
    </BrowserRouter>
  );
}

export default App;
