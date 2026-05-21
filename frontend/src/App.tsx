import { useState } from 'react';
import './App.css';
import RhythmLoader from './components/RhythmLoader';

function App() {
  // Start as false so the loader appears immediately
  const [loaded, setLoaded] = useState(false);

  // This function runs when the "Continue" button is clicked inside the loader
  const handleLoadComplete = () => {
    setLoaded(true);
  };

  return (
    <div className="App">
      {/* We use curly braces {} to write JS logic inside JSX */}
      {!loaded ? (
        // If NOT loaded, show the Loader and tell it what to do when finished
        <RhythmLoader onComplete={handleLoadComplete} />
      ) : (
        // If loaded, show your actual Application content
        <div className="main-content">
          <h1>Welcome to the App!</h1>
          <p>The loading screen is finished.</p>
        </div>
      )}
    </div>
  );
}

export default App;