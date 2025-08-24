"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AdminHome() {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Auto logout when time expires
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
    <div className="section">
      <div className="admin-header">
        <h1 style={{ marginTop: 0 }}>Paneli i Administrimit ✨</h1>
        <div className="session-timer">
          <span className="timer-icon">⏰</span>
          <span>Sesioni skadon në: {formatTime(timeLeft)}</span>
        </div>
      </div>
      
      <div className="alert" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444', marginBottom: '24px' }}>
        ⚠️ Për siguri, sesioni skadon pas 5 minutash. Do të duhet të futni fjalëkalimin përsëri.
      </div>

      <div className="grid">
        <div className="card">
          <h3 className="card-title">🦜 Përditëso Papagajt</h3>
          <p>Shto, redakto, fshi dhe shëno disponueshmërinë.</p>
          <Link href="/ErvinAdmin/parrots" className="btn">Hap menaxhimin</Link>
        </div>
        <div className="card">
          <h3 className="card-title">🎓 Planet e Trajnimit</h3>
          <p>Menaxho informacionin dhe çmimet e trajnimit.</p>
          <Link href="/ErvinAdmin/trainings" className="btn">Hap menaxhimin</Link>
        </div>
        <div className="card">
          <h3 className="card-title">🚪 Dalje</h3>
          <p>Mbyll sesionin e hyrjes së adminit.</p>
          <a className="btn danger" href="/api/ErvinAdmin/logout">DIL</a>
        </div>
      </div>
    </div>
  );
}

