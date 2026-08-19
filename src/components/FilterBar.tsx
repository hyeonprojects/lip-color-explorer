import React from 'react';
import { FormulaType, ToneType } from '../types/lip';
import { Sparkles } from 'lucide-react';

interface FilterBarProps {
  selectedFormula: FormulaType;
  onSelectFormula: (formula: FormulaType) => void;
  selectedTone: ToneType;
  onSelectTone: (tone: ToneType) => void;
}

const FORMULAS: FormulaType[] = ['전체', '매트', '글로시', '벨벳'];
const TONES: ToneType[] = ['전체', '웜톤', '쿨톤', '뮤트'];

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedFormula,
  onSelectFormula,
  selectedTone,
  onSelectTone,
}) => {
  return (
    <div className="space-y-2 py-2">
      {/* Formula Filter Row */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        <span className="text-[11px] font-semibold text-[#787878] shrink-0 pr-1 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#E26A74]" />
          제형
        </span>
        {FORMULAS.map((formula) => {
          const isActive = selectedFormula === formula;
          return (
            <button
              key={`formula-${formula}`}
              onClick={() => onSelectFormula(formula)}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium shrink-0 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#E26A74] focus-visible:outline-none ${
                isActive
                  ? 'bg-[#E26A74] text-white shadow-xs font-semibold'
                  : 'bg-white text-[#787878] border border-[#EFEFEF] hover:bg-[#F5F4F2] hover:text-[#1E1E1E]'
              }`}
            >
              {formula}
            </button>
          );
        })}

        <div className="h-4 w-[1px] bg-[#E5E5E3] mx-1 shrink-0" />

        {/* Tone Filter Row */}
        <span className="text-[11px] font-semibold text-[#787878] shrink-0 px-1">
          톤
        </span>
        {TONES.map((tone) => {
          const isActive = selectedTone === tone;
          return (
            <button
              key={`tone-${tone}`}
              onClick={() => onSelectTone(tone)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-medium shrink-0 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#E26A74] focus-visible:outline-none ${
                isActive
                  ? 'bg-[#1E1E1E] text-white shadow-xs font-semibold'
                  : 'bg-white text-[#787878] border border-[#EFEFEF] hover:bg-[#F5F4F2] hover:text-[#1E1E1E]'
              }`}
            >
              {tone}
            </button>
          );
        })}
      </div>
    </div>
  );
};
