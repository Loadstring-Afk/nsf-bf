import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import WelcomeScreen from './components/WelcomeScreen';
import MainExperience from './components/MainExperience';
import SuccessView from './components/SuccessView';

function App() {
  const [stage, setStage] = useState('welcome'); // welcome, main, success

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {stage === 'welcome' && (
          <WelcomeScreen key="welcome" onEnter={() => setStage('main')} />
        )}
        
        {stage === 'main' && (
          <MainExperience 
            key="main" 
            onYesClick={() => setStage('success')} 
          />
        )}
        
        {stage === 'success' && (
          <SuccessView key="success" />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;