import React from 'react';
import { Search, X } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  productCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  productCount,
}) => {
  return (
    <header className="sticky top-0 z-10 bg-[#FBFBFA]/90 backdrop-blur-md border-b border-[#EFEFEF]">
      <div className="max-w-5xl mx-auto px-4 py-3 sm:py-4 flex flex-col gap-3">
        {/* Top Row: Logo & Count */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#1E1E1E]">
              LIP <span className="text-[#E26A74] font-extrabold">EXPLORER</span>
            </span>
            <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase text-[#E26A74] bg-[#FDF2F3] rounded-full border border-[#E26A74]/20">
              K-Beauty
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Product Count Pill */}
            <span className="text-[11px] font-medium text-[#787878] bg-[#F5F4F2] px-2.5 py-1 rounded-full">
              총 <strong className="text-[#1E1E1E] font-semibold">{productCount}</strong>개
            </span>
          </div>
        </div>

        {/* Real-time Search Input */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#A6A6A6]">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="컬러명, 브랜드, 제품명 검색 (예: 솔티, 롬앤)"
            className="w-full pl-9 pr-9 py-2.5 bg-white border border-[#EFEFEF] rounded-xl text-[13px] text-[#1E1E1E] placeholder-[#A6A6A6] focus:outline-none focus:border-[#E26A74] focus:ring-2 focus:ring-[#E26A74]/20 transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#A6A6A6] hover:text-[#1E1E1E] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
