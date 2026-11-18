import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import AuthModal from './components/AuthModal';
import ResumeBuilder from './components/ResumeBuilder';
import TargetCompaniesStep from './components/TargetCompaniesStep';
import TargetRolesStep from './components/TargetRolesStep';
import LocationPreferenceStep from './components/LocationPreferenceStep';
import LinkedInImportStep from './components/LinkedInImportStep';
import ProcessingStep from './components/ProcessingStep';
import Dashboard from './components/Dashboard';

export default function App() {
  // Screen state:
  // 'landing' | 'onboarding-resume' | 'onboarding-companies' | 'onboarding-roles' | 'onboarding-location' | 'onboarding-linkedin' | 'onboarding-processing' | 'dashboard'
  const [currentScreen, setCurrentScreen] = useState(() => {
    return localStorage.getItem('omniapply_screen') || 'landing';
  });

  // Auth modal state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signup'); // 'signup' | 'login'

  // User state
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('omniapply_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Resume data state
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem('omniapply_resume');
    return saved ? JSON.parse(saved) : null;
  });

  // Target Companies state
  const [targetCompanies, setTargetCompanies] = useState(() => {
    const saved = localStorage.getItem('omniapply_companies');
    return saved ? JSON.parse(saved) : ['Google', 'Microsoft', 'Uber', 'Amazon', 'Stripe'];
  });

  // Target Roles state
  const [targetRoles, setTargetRoles] = useState(() => {
    const saved = localStorage.getItem('omniapply_roles');
    return saved ? JSON.parse(saved) : ['Full Stack Engineer', 'Backend Engineer'];
  });

  // Location Preferences state
  const [locationPref, setLocationPref] = useState(() => {
    const saved = localStorage.getItem('omniapply_location');
    return saved ? JSON.parse(saved) : { mode: 'both', cities: ['Bangalore, India', 'Remote (Worldwide / Anywhere)'], isOpenToRelocate: true };
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('omniapply_screen', currentScreen);
  }, [currentScreen]);

  useEffect(() => {
    if (user) localStorage.setItem('omniapply_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    if (resumeData) localStorage.setItem('omniapply_resume', JSON.stringify(resumeData));
  }, [resumeData]);

  useEffect(() => {
    localStorage.setItem('omniapply_companies', JSON.stringify(targetCompanies));
  }, [targetCompanies]);

  useEffect(() => {
    localStorage.setItem('omniapply_roles', JSON.stringify(targetRoles));
  }, [targetRoles]);

  useEffect(() => {
    localStorage.setItem('omniapply_location', JSON.stringify(locationPref));
  }, [locationPref]);

  // Auth Handlers
  const handleStartFree = () => {
    setAuthMode('signup');
    setIsAuthModalOpen(true);
  };

  const handleOpenLogin = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = (userData, isFirstTimeSignup) => {
    setUser(userData);
    setIsAuthModalOpen(false);

    if (isFirstTimeSignup || !resumeData) {
      // First time signup: user needs to update basic details for resume
      setCurrentScreen('onboarding-resume');
    } else {
      // Direct to dashboard
      setCurrentScreen('dashboard');
    }
  };

  // Onboarding Step Handlers
  const handleSaveResume = (data) => {
    setResumeData(data);
    setCurrentScreen('onboarding-companies');
  };

  const handleSaveCompanies = (companies) => {
    setTargetCompanies(companies);
    setCurrentScreen('onboarding-roles');
  };

  const handleSaveRoles = (roles) => {
    setTargetRoles(roles);
    setCurrentScreen('onboarding-location');
  };

  const handleSaveLocation = (pref) => {
    setLocationPref(pref);
    setCurrentScreen('onboarding-linkedin');
  };

  const handleFinishLinkedIn = (archiveInfo) => {
    // Smooth transaction finish and loading & processing screen
    setCurrentScreen('onboarding-processing');
  };

  const handleProcessingComplete = () => {
    setCurrentScreen('dashboard');
  };

  const handleSignOut = () => {
    setUser(null);
    setCurrentScreen('landing');
    localStorage.removeItem('omniapply_screen');
    localStorage.removeItem('omniapply_user');
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased selection:bg-white selection:text-black">
      
      {/* 1. LANDING PAGE */}
      {currentScreen === 'landing' && (
        <LandingPage 
          onStartFree={handleStartFree}
          onLogin={handleOpenLogin}
        />
      )}

      {/* 2. ONBOARDING: RESUME BUILDER WITH LIVE PREVIEW */}
      {currentScreen === 'onboarding-resume' && (
        <ResumeBuilder 
          initialData={resumeData}
          onSaveAndContinue={handleSaveResume}
        />
      )}

      {/* 3. ONBOARDING: TARGET COMPANIES SELECTION */}
      {currentScreen === 'onboarding-companies' && (
        <TargetCompaniesStep 
          selected={targetCompanies}
          onContinue={handleSaveCompanies}
          onBack={() => setCurrentScreen('onboarding-resume')}
        />
      )}

      {/* 4. ONBOARDING: TARGET ROLES SELECTION */}
      {currentScreen === 'onboarding-roles' && (
        <TargetRolesStep 
          selected={targetRoles}
          onContinue={handleSaveRoles}
          onBack={() => setCurrentScreen('onboarding-companies')}
        />
      )}

      {/* 5. ONBOARDING: LOCATION PREFERENCE */}
      {currentScreen === 'onboarding-location' && (
        <LocationPreferenceStep 
          initialData={locationPref}
          onContinue={handleSaveLocation}
          onBack={() => setCurrentScreen('onboarding-roles')}
        />
      )}

      {/* 6. ONBOARDING: LINKEDIN DATA IMPORT */}
      {currentScreen === 'onboarding-linkedin' && (
        <LinkedInImportStep 
          onFinish={handleFinishLinkedIn}
          onSkip={handleFinishLinkedIn}
          onBack={() => setCurrentScreen('onboarding-location')}
        />
      )}

      {/* 7. LOADING & PROCESSING SCREEN */}
      {currentScreen === 'onboarding-processing' && (
        <ProcessingStep 
          onComplete={handleProcessingComplete}
          summaryData={{
            companies: targetCompanies,
            roles: targetRoles,
            location: locationPref
          }}
        />
      )}

      {/* 8. MAIN DASHBOARD */}
      {currentScreen === 'dashboard' && (
        <Dashboard 
          user={user}
          resumeData={resumeData}
          targetCompanies={targetCompanies}
          targetRoles={targetRoles}
          locationPref={locationPref}
          onUpdateResume={(updated) => setResumeData(updated)}
          onSignOut={handleSignOut}
          onBackToPreferences={() => setCurrentScreen('onboarding-companies')}
        />
      )}

      {/* AUTH MODAL (Login / Signup with Google, GitHub, Email + OTP) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
        onAuthSuccess={handleAuthSuccess}
      />

    </div>
  );
}
