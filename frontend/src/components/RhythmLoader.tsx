import { useState, useEffect } from 'react';
import './RythmLoader.css';
 
// --- Types ---
interface RhythmLoaderProps {
  duration?: number;
  children?: React.ReactNode;
  onComplete?: () => void;
}
 
export function RhythmLoader({ duration = 8000, children, onComplete }: RhythmLoaderProps) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING...');
 
  const messages = [
    'INITIALIZING...',
    'SYNCING BEATS...',
    'LOADING ASSETS...',
    'CALIBRATING AUDIO...',
    'ESTABLISHING LINK...',
    'RENDERING TRACKS...',
  ];
 
  // Progress counter
  useEffect(() => {
    const start = Date.now();
 
    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
 
      // Cycle status text based on progress
      const msgIndex = Math.min(
        Math.floor((pct / 100) * messages.length),
        messages.length - 1
      );
      setStatusText(messages[msgIndex]);
 
      if (pct >= 100) {
        clearInterval(tick);
        setLoading(false);
        // Removed automatic onComplete call here so the user must click the button
      }
    }, 100);
 
    return () => clearInterval(tick);
  }, [duration]);
 
  // Spawn falling notes via DOM
  useEffect(() => {
    if (!loading) return;
 
    const highway = document.querySelector<HTMLDivElement>('.highway-container');
    if (!highway) return;
 
    const colors = ['', 'pink', 'yellow'];
 
    const interval = setInterval(() => {
      const note = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      note.className = `note${color ? ' ' + color : ''}`;
      note.style.left = `${Math.floor(Math.random() * 4) * 25}%`;
      highway.appendChild(note);
      setTimeout(() => note.parentNode?.removeChild(note), 1500);
    }, 400);
 
    return () => clearInterval(interval);
  }, [loading]);
 
  return (
    <>
      <div className="rhythm-loader-wrapper">
        <div className="grid-bg" />
 
        {/* Loading Screen */}
        <div className={`loader-view${loading ? '' : ' hidden'}`}>
          <div className="highway-container">
            <div className="hit-line" />
            <div className="lane" />
            <div className="lane" />
            <div className="lane" />
            <div className="lane" />
          </div>
 
          <div className="loader-ui">
            <h1 className="status-text">{loading ? statusText : 'COMPLETE!'}</h1>
            <div className="progress-container">
              <div className="progress-bar" style={{ width: `${progress}%` }} />
            </div>
            <div className="percentage">{Math.floor(progress)}%</div>
          </div>
        </div>
 
        {/* Main Content — Warning card with Continue button */}
        <div className={`main-view${!loading ? ' visible' : ''}`}>
          {children || (
            <div className="card">
              <h2 className="welcome-title">WARNING!</h2>
              <p className="welcome-desc">
                Epilepsy warning: This application contains rapidly flashing lights
                and may not be suitable for individuals with photosensitive epilepsy.
                Viewer discretion is advised.
              </p>
              {/* Button is now always rendered in the card, visible when main-view is visible */}
              <button className="continue-btn" onClick={() => onComplete?.()}>Continue</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
 
export default RhythmLoader;