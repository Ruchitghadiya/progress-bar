import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const ProgressBar = () => {

  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [duration, setDuration] = useState(20);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startProgress = () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setProgress(0);
    startTimeRef.current = Date.now();
    
    intervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);
      
      if (newProgress >= 100) {
        clearInterval(intervalRef.current);
        setIsRunning(false);
      }
    }, 50);
  };

  const resetProgress = () => {
    clearInterval(intervalRef.current);
    setProgress(0);
    setIsRunning(false);
  };

  const handleDurationChange = (e) => {
    if (!isRunning) {
      setDuration(Number(e.target.value));
    }
  };

  return (
    <div className="progress-container">
      <div className="controls">
        <div>
          <label>Duration (seconds): </label>
          <input 
            type="number" 
            value={duration} 
            onChange={handleDurationChange}
            disabled={isRunning}
            min="1"
          />
        </div>
        
        <div className="buttons">
          <button onClick={startProgress} disabled={isRunning}>
            Start Progress
          </button>
          <button onClick={resetProgress} disabled={!isRunning && progress === 0}>
            Reset
          </button>
        </div>
      </div>
      
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="progress-text">
        {progress.toFixed(1)}% Complete
        {isRunning && (
          <span> (Time remaining: {(duration - (duration * progress / 100)).toFixed(1)}s)</span>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;