import { useState } from 'react';
import Profile from './components/Profile';
import Projects from './components/Projects';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('profile');

  return (
    <div className="App">      
      <nav className="nav-container">
        <div className="nav-content">
          <h1 className="nav-title">Me-API Playground</h1>
          <div className="nav-buttons">
            <button 
              onClick={() => setCurrentView('profile')}
              className={`nav-btn ${currentView === 'profile' ? 'active' : ''}`}
            >
              Profile
            </button>
            <button 
              onClick={() => setCurrentView('projects')}
              className={`nav-btn ${currentView === 'projects' ? 'active' : ''}`}
            >
              Projects
            </button>
          </div>
        </div>
      </nav>

      <main className="main-content">
        {currentView === 'profile' && <Profile />}
        {currentView === 'projects' && <Projects />}
      </main>
    </div>
  );
}

export default App;
