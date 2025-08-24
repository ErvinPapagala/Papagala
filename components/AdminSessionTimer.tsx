"use client";
import { useEffect, useState } from 'react';

export default function AdminSessionTimer() {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.location.href = '/api/ErvinAdmin/logout';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="session-timer">
      <span className="timer-icon">⏰</span>
      <span>Sesioni skadon në: {formatTime(timeLeft)}</span>
    </div>
  );
}