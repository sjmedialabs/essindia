'use client';

import React from 'react';
import { humanLabel } from './field-utils';

interface ColorPickerFieldProps {
  fieldKey: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
}

export function ColorPickerField({ fieldKey, label, value, onChange }: ColorPickerFieldProps) {
  const currentValue = value || '';

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <label className="text-xs font-semibold text-slate-500">{label || humanLabel(fieldKey)}</label>
        {currentValue && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-[10px] font-bold text-slate-400 hover:text-red-500 transition-colors"
          >
            Clear (Use Default)
          </button>
        )}
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            type="color"
            value={currentValue || '#ffffff'}
            onChange={(e) => onChange(e.target.value)}
            className="w-10 h-10 rounded-xl border border-slate-200 cursor-pointer p-0.5"
          />
        </div>
        <input
          type="text"
          value={currentValue}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Please enter color code (e.g. #7C3AED)"
          className="flex-1 bg-slate-50 rounded-xl px-4 py-2.5 text-xs font-mono outline-none focus:ring-2 focus:ring-[#4B2A63]/10 border border-transparent focus:border-[#4B2A63]/20"
        />
        {currentValue ? (
          <div
            className="w-10 h-10 rounded-xl border border-slate-200 shrink-0 shadow-sm"
            style={{ backgroundColor: currentValue }}
          />
        ) : (
          <div className="w-10 h-10 rounded-xl border border-dashed border-slate-300 bg-slate-100 flex items-center justify-center shrink-0">
            <span className="text-[9px] font-bold text-slate-400 uppercase">Auto</span>
          </div>
        )}
      </div>
    </div>
  );
}
