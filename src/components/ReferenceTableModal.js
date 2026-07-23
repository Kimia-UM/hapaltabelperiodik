'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { elements } from '@/data/elements';

function getCategoryColor(atomicNumber) {
  if ([1].includes(atomicNumber)) return '#60a5fa';
  if ([2, 10, 18, 36, 54, 86, 118].includes(atomicNumber)) return '#a78bfa';
  if ([3, 11, 19, 37, 55, 87].includes(atomicNumber)) return '#f87171';
  if ([4, 12, 20, 38, 56, 88].includes(atomicNumber)) return '#fb923c';
  if (atomicNumber >= 57 && atomicNumber <= 71) return '#34d399';
  if (atomicNumber >= 89 && atomicNumber <= 103) return '#2dd4bf';
  if ([5, 14, 32, 33, 51, 52, 85].includes(atomicNumber)) return '#a3e635';
  if ([6, 7, 8, 9, 15, 16, 17, 34, 35, 53].includes(atomicNumber)) return '#fbbf24';
  if ([13, 31, 49, 50, 81, 82, 83, 84, 113, 114, 115, 116].includes(atomicNumber)) return '#94a3b8';
  return '#38bdf8';
}

function ModalContent({ onClose }) {
  const grid = Array.from({ length: 10 }, () => Array(18).fill(null));
  elements.forEach(el => {
    grid[el.row - 1][el.col - 1] = el;
  });

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="ref-overlay" onClick={onClose}>
      <div className="ref-modal" onClick={e => e.stopPropagation()}>
        <div className="ref-header">
          <h2 className="ref-title">Tabel Periodik Referensi</h2>
          <button className="ref-close" onClick={onClose} suppressHydrationWarning>✕</button>
        </div>

        <div className="ref-legend">
          <span className="legend-item" style={{ '--c': '#60a5fa' }}>Hidrogen</span>
          <span className="legend-item" style={{ '--c': '#f87171' }}>Logam Alkali</span>
          <span className="legend-item" style={{ '--c': '#fb923c' }}>Alkali Tanah</span>
          <span className="legend-item" style={{ '--c': '#38bdf8' }}>Logam Transisi</span>
          <span className="legend-item" style={{ '--c': '#94a3b8' }}>Logam Pasca-Trans</span>
          <span className="legend-item" style={{ '--c': '#a3e635' }}>Metaloid</span>
          <span className="legend-item" style={{ '--c': '#fbbf24' }}>Nonlogam</span>
          <span className="legend-item" style={{ '--c': '#a78bfa' }}>Gas Mulia</span>
          <span className="legend-item" style={{ '--c': '#34d399' }}>Lantanida</span>
          <span className="legend-item" style={{ '--c': '#2dd4bf' }}>Aktinida</span>
        </div>

        <div className="ref-scroll-area">
          <div className="ref-grid">
            {grid.map((row, rowIdx) =>
              row.map((el, colIdx) => {
                if (!el) {
                  if (rowIdx === 7) return null;
                  return (
                    <div
                      key={`empty-${rowIdx}-${colIdx}`}
                      className="ref-cell ref-empty"
                      style={{ gridRow: rowIdx + 1, gridColumn: colIdx + 1 }}
                    />
                  );
                }
                return (
                  <div
                    key={el.atomicNumber}
                    className="ref-cell"
                    style={{
                      gridRow: el.row,
                      gridColumn: el.col,
                      '--cat-color': getCategoryColor(el.atomicNumber)
                    }}
                  >
                    <span className="ref-num">{el.atomicNumber}</span>
                    <span className="ref-symbol">{el.symbol}</span>
                    <span className="ref-name">{el.name}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReferenceTableModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure portal is only used client-side
  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      <button
        className="btn btn-reference"
        onClick={() => setIsOpen(true)}
        suppressHydrationWarning
        title="Lihat Tabel Periodik Referensi"
      >
        📋 Lihat Tabel
      </button>

      {mounted && isOpen && createPortal(
        <ModalContent onClose={() => setIsOpen(false)} />,
        document.body
      )}
    </>
  );
}
