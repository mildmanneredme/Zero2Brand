import React from 'react';
import { BrandConcept } from '../types';

interface ConceptCardProps {
  concept: BrandConcept;
  onSelect: (concept: BrandConcept) => void;
  isSelected: boolean;
}

export const ConceptCard: React.FC<ConceptCardProps> = ({ concept, onSelect, isSelected }) => {
  return (
    <div 
      onClick={() => onSelect(concept)}
      className={`
        cursor-pointer rounded-xl border-2 p-6 transition-all duration-300
        ${isSelected 
          ? 'border-blue-500 bg-slate-800 shadow-[0_0_30px_rgba(59,130,246,0.2)]' 
          : 'border-slate-700 bg-slate-800/50 hover:border-slate-500 hover:bg-slate-800'
        }
      `}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-white">{concept.name}</h3>
        {isSelected && <span className="text-blue-400 font-medium text-sm">Selected</span>}
      </div>
      
      <p className="text-slate-400 text-sm mb-6 line-clamp-3">{concept.description}</p>
      
      {/* Mini Palette Preview */}
      <div className="flex gap-2 mb-6">
        {concept.colors?.map((c, i) => (
          <div 
            key={i} 
            className="w-8 h-8 rounded-full shadow-sm border border-white/10"
            style={{ backgroundColor: c.hex }}
            title={`${c.name} - ${c.usage}`}
          />
        ))}
      </div>

      <div className="space-y-3">
        <div className="bg-slate-900/50 p-3 rounded-lg">
          <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider">Typography</p>
          <div className="flex flex-col gap-1">
            <span className="text-lg text-white font-serif">{concept.typography?.headerFont || 'Serif'}</span>
            <span className="text-sm text-slate-300">{concept.typography?.bodyFont || 'Sans-serif'}</span>
          </div>
        </div>

        <div className="bg-slate-900/50 p-3 rounded-lg">
           <p className="text-xs text-slate-500 mb-2 uppercase tracking-wider">Button Style</p>
           <button 
             className={`${concept.buttonStyle?.tailwindClasses || 'bg-blue-500 text-white p-2 rounded'} w-full text-center pointer-events-none`}
             // Override hover for static display if needed, but Tailwind classes usually handle it well
           >
             Action Button
           </button>
        </div>
      </div>
    </div>
  );
};