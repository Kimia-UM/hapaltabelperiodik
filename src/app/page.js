'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { elements } from '@/data/elements';
import PeriodicTable from '@/components/PeriodicTable';
import ReferenceTableModal from '@/components/ReferenceTableModal';

export default function Home() {
  const [userAnswers, setUserAnswers] = useState({});
  const [validationStatuses, setValidationStatuses] = useState({});
  const [showAtomicNumber, setShowAtomicNumber] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  // Calculate score whenever validation statuses change
  useEffect(() => {
    let count = 0;
    Object.values(validationStatuses).forEach(status => {
      if (status === 'correct') count++;
    });
    setCorrectCount(count);

    if (count === elements.length) {
      setIsSuccess(true);
    }
  }, [validationStatuses]);

  const handleCellChange = (atomicNumber, value) => {
    // Only allow max 3 chars
    if (value.length > 3) return;

    // Normalize string (Capitalize first letter, lowercase rest)
    const normalized = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

    setUserAnswers(prev => ({
      ...prev,
      [atomicNumber]: normalized
    }));

    const el = elements.find(e => e.atomicNumber === atomicNumber);

    // Immediately mark as correct if the answer matches exactly
    if (normalized === el.symbol) {
      setValidationStatuses(prev => ({
        ...prev,
        [atomicNumber]: 'correct'
      }));
    } else if (validationStatuses[atomicNumber] === 'error') {
      // Clear error status if user types again and it was previously error
      setValidationStatuses(prev => ({
        ...prev,
        [atomicNumber]: 'default'
      }));
    }
  };

  const handleCellBlur = (atomicNumber, value) => {
    if (!value) return; // Do not shake if they just leave it empty

    const el = elements.find(e => e.atomicNumber === atomicNumber);
    if (value !== el.symbol) {
      // Tandai error agar kotak shake + merah
      setValidationStatuses(prev => ({
        ...prev,
        [atomicNumber]: 'error'
      }));
      // Hapus jawaban salah agar user langsung bisa isi ulang
      setUserAnswers(prev => ({
        ...prev,
        [atomicNumber]: ''
      }));
    }
  };

  const handleReset = () => {
    setUserAnswers({});
    setValidationStatuses({});
    setIsSuccess(false);
    setCorrectCount(0);
  };

  return (
    <>
      <Head>
        <title>Hafal Periodik</title>
        <meta name="description" content="Latihan menghafal tabel periodik unsur" />
      </Head>

      <main>
        <header className="app-header">
          <div className="header-title">IPUNG HAFAL PERIODIK UNTUK SKRIPSI</div>

          <div className="controls-bar">
            <div className="score-display">
              Benar: {correctCount} / 118
            </div>

            <label className="toggle-wrapper">
              <div
                className={`toggle-switch ${showAtomicNumber ? 'active' : ''}`}
                onClick={() => setShowAtomicNumber(!showAtomicNumber)}
              />
              Nomor Atom
            </label>

            <button className="btn btn-secondary" onClick={handleReset} suppressHydrationWarning={true}>
              Reset
            </button>

            <ReferenceTableModal />
          </div>
        </header>

        <PeriodicTable
          elements={elements}
          userAnswers={userAnswers}
          validationStatuses={validationStatuses}
          onCellChange={handleCellChange}
          onCellValidate={handleCellBlur}
          showAtomicNumber={showAtomicNumber}
        />

        <div className={`success-overlay ${isSuccess ? 'visible' : ''}`}>
          <div className="glass-panel success-card">
            <div className="success-title">Selamat! 🎉</div>
            <div className="success-text">
              Anda berhasil menghafal seluruh 118 unsur tabel periodik.
            </div>
            <button className="btn btn-primary" onClick={handleReset} suppressHydrationWarning={true}>
              Main Lagi
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
