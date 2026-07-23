'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function ElementCell({
  element,
  value,
  onChange,
  onValidate,
  status,
  showAtomicNumber
}) {
  const [isShaking, setIsShaking] = useState(false);
  const inputRef = useRef(null);

  // Trigger shake animation whenever status flips to 'error'
  useEffect(() => {
    if (status === 'error') {
      setIsShaking(true);
      const timer = setTimeout(() => setIsShaking(false), 450);
      return () => clearTimeout(timer);
    }
  }, [status]);

  // When status becomes error, refocus the input so user can type immediately
  useEffect(() => {
    if (status === 'error' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [status]);

  const gridArea = `${element.row} / ${element.col}`;

  let statusClass = '';
  if (status === 'correct') statusClass = 'is-correct';
  if (status === 'error') statusClass = 'is-error';

  const shakeClass = isShaking ? 'shake-animation' : '';

  const handleBlur = () => {
    if (!value) return;
    onValidate && onValidate(element.atomicNumber, value);
  };

  return (
    <div
      className={`element-cell ${statusClass} ${shakeClass}`}
      style={{ gridArea }}
    >
      {showAtomicNumber && (
        <span className="atomic-number">{element.atomicNumber}</span>
      )}
      <input
        ref={inputRef}
        type="text"
        className="element-input"
        maxLength={3}
        value={value}
        onChange={(e) => onChange(element.atomicNumber, e.target.value)}
        onBlur={handleBlur}
        disabled={status === 'correct'}
        autoComplete="off"
        spellCheck="false"
        suppressHydrationWarning={true}
      />
    </div>
  );
}
