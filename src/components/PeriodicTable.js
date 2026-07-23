'use client';

import React from 'react';
import ElementCell from './ElementCell';

export default function PeriodicTable({
  elements,
  userAnswers,
  validationStatuses,
  onCellChange,
  onCellValidate,
  showAtomicNumber
}) {
  return (
    <div className="table-container">
      <div className="periodic-grid">
        {elements.map((el) => {
          const value = userAnswers[el.atomicNumber] || '';
          const status = validationStatuses[el.atomicNumber] || 'default';

          return (
            <ElementCell
              key={el.atomicNumber}
              element={el}
              value={value}
              onChange={onCellChange}
              onValidate={onCellValidate}
              status={status}
              showAtomicNumber={showAtomicNumber}
            />
          );
        })}
        {/* Adds a gap row between main table and lanthanides */}
        <div className="lanthanides-gap"></div>
      </div>
    </div>
  );
}
