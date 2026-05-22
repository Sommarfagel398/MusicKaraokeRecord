import { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import './App.css';
import RhythmLoader from './components/RhythmLoader';

function App() {
  const [loaded, setLoaded] = useState(false);

  // Toggle between login/register
  const [isLogin, setIsLogin] = useState(true);

  const handleLoadComplete = () => {
    setLoaded(true);
  };

  return (
    <div className="App">
      {!loaded ? (
        <RhythmLoader onComplete={handleLoadComplete} />
      ) : (
        <div className="main-content">
          {isLogin ? (
            <Login onSwitch={() => setIsLogin(false)} />
          ) : (
            <Register onSwitch={() => setIsLogin(true)} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;