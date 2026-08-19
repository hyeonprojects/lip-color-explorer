import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  onResetFilters: () => void;
  query?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  onResetFilters,
  query,
}) => {
  return (
    <div className="py-16 text-center space-y-4 max-w-sm mx-auto px-4">
      <div className="w-16 h-16 rounded-full bg-[#FDF2F3] text-[#E26A74] flex items-center justify-center mx-auto shadow-inner">
        <SearchX className="w-8 h-8" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-[#1E1E1E]">
          {query
            ? `'${query}' 검색 결과가 없어요`
            : '조건에 맞는 립 컬러를 찾지 못했어요.'}
        </h3>
        <p className="text-[12px] text-[#787878] mt-1">
          다른 필터 조건이나 검색어로 립 컬러를 탐색해 보세요.
        </p>
      </div>
      <button
        onClick={onResetFilters}
        className="inline-flex items-center gap-1.5 px-4 py-2 text-[12px] font-semibold text-[#E26A74] bg-[#FDF2F3] rounded-full hover:bg-[#FCE7E9] active:scale-95 transition-all shadow-xs"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>필터 초기화</span>
      </button>
    </div>
  );
};

export const SkeletonGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
      {Array.from({ length: 8 }).map((_, idx) => (
        <div
          key={idx}
          className="rounded-xl p-3 bg-white border border-[#EFEFEF] animate-pulse space-y-2.5"
        >
          <div className="aspect-square w-full rounded-lg bg-neutral-200" />
          <div className="h-3 bg-neutral-200 rounded w-2/3" />
          <div className="h-4 bg-neutral-200 rounded w-full" />
          <div className="flex gap-1">
            <div className="h-4 bg-neutral-200 rounded w-10" />
            <div className="h-4 bg-neutral-200 rounded w-10" />
          </div>
          <div className="h-4 bg-neutral-200 rounded w-1/3 pt-1" />
        </div>
      ))}
    </div>
  );
};
