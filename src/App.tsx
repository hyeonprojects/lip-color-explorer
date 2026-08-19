import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_LIPS } from './data/mockLips';
import { LipProduct, FormulaType, ToneType, ToastMessage } from './types/lip';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { ProductCard } from './components/ProductCard';
import { DetailModal } from './components/DetailModal';
import { Toast } from './components/Toast';
import { EmptyState, SkeletonGrid } from './components/StateViews';
import { Sparkles, Heart } from 'lucide-react';

export function App() {
  // Filter States
  const [selectedFormula, setSelectedFormula] = useState<FormulaType>('전체');
  const [selectedTone, setSelectedTone] = useState<ToneType>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyLiked, setOnlyLiked] = useState<boolean>(false);

  // Modal & Selected Product State
  const [selectedProduct, setSelectedProduct] = useState<LipProduct | null>(null);

  // Wishlist State (Liked product IDs)
  const [likedIds, setLikedIds] = useState<(string | number)[]>(() => {
    try {
      const saved = localStorage.getItem('lip_liked_ids');
      return saved ? JSON.parse(saved) : [1, 3]; // Default 2 items liked
    } catch {
      return [1, 3];
    }
  });

  // Save liked IDs to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('lip_liked_ids', JSON.stringify(likedIds));
    } catch {
      // Ignore quota errors
    }
  }, [likedIds]);

  // Toast Notification State
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = (text: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToast({ id, text, type });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 2200);
  };

  // Simulated Loading State
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Filter & Search Logic
  const filteredProducts = useMemo(() => {
    return MOCK_LIPS.filter((product) => {
      const formula = product.finish || product.formula;
      // 1. Formula filter
      if (selectedFormula !== '전체' && formula !== selectedFormula) {
        return false;
      }
      // 2. Tone filter
      if (selectedTone !== '전체' && product.tone !== selectedTone) {
        return false;
      }
      // 3. Wishlist filter
      if (onlyLiked && !likedIds.includes(product.id)) {
        return false;
      }
      // 4. Real-time Search input (matches brand, product name, color name)
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesColor = product.colorName.toLowerCase().includes(query);
        const matchesTags = product.tags?.some((tag) =>
          tag.toLowerCase().includes(query)
        );
        return matchesBrand || matchesName || matchesColor || matchesTags;
      }
      return true;
    });
  }, [selectedFormula, selectedTone, searchQuery, onlyLiked, likedIds]);

  // Toggle Like Handler
  const handleToggleLike = (
    e?: React.MouseEvent,
    productId?: string | number
  ) => {
    if (e) e.stopPropagation();
    const targetId = productId ?? selectedProduct?.id;
    if (targetId === undefined) return;

    setLikedIds((prev) => {
      const isAlreadyLiked = prev.includes(targetId);
      const next = isAlreadyLiked
        ? prev.filter((id) => id !== targetId)
        : [...prev, targetId];

      const productObj = MOCK_LIPS.find((p) => p.id === targetId);
      const nameStr = productObj ? `${productObj.brand} ${productObj.colorName}` : '제품';

      showToast(
        isAlreadyLiked
          ? `${nameStr} 위시리스트 삭제`
          : `❤️ ${nameStr} 위시리스트에 담았어요!`,
        isAlreadyLiked ? 'info' : 'success'
      );

      return next;
    });
  };

  // Copy Hex Code Handler
  const handleCopyHex = (hex: string) => {
    showToast(`HEX ${hex} 색상 코드가 복사되었습니다! ✨`, 'success');
  };

  // Share Handler
  const handleShare = (product: LipProduct) => {
    const hex = product.hex || product.hexColor;
    if (navigator.share) {
      navigator.share({
        title: `${product.brand} ${product.name} (${product.colorName})`,
        text: `K-Beauty 립 탐색: ${product.brand} ${product.colorName} (${hex})`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(
        `${product.brand} ${product.name} - ${product.colorName} (${hex})`
      );
      showToast('제품 정보가 클립보드에 복사되었습니다! 📋', 'info');
    }
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSelectedFormula('전체');
    setSelectedTone('전체');
    setSearchQuery('');
    setOnlyLiked(false);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA]">
      {/* Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        productCount={filteredProducts.length}
      />

      {/* Main Responsive Shell Container */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 pb-[calc(2rem+env(safe-area-inset-bottom))]">
        <main className="space-y-4">
          {/* Filter Bar & Wishlist Quick Filter */}
          <div className="flex flex-col gap-2 bg-white p-3 sm:p-4 rounded-2xl border border-[#EFEFEF] shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[12px] sm:text-[13px] font-bold text-[#1E1E1E]">
                <Sparkles className="w-4 h-4 text-[#E26A74]" />
                <span>립 카테고리 필터</span>
              </div>

              {/* Wishlist Toggle Button */}
              <button
                onClick={() => setOnlyLiked((prev) => !prev)}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                  onlyLiked
                    ? 'bg-[#FDF2F3] text-[#E26A74] border border-[#E26A74]/30 font-semibold'
                    : 'bg-[#F5F4F2] text-[#787878] hover:text-[#1E1E1E]'
                }`}
              >
                <Heart
                  className={`w-3 h-3 ${
                    onlyLiked ? 'fill-[#E26A74] text-[#E26A74]' : ''
                  }`}
                />
                <span>위시리스트 ({likedIds.length})</span>
              </button>
            </div>

            <FilterBar
              selectedFormula={selectedFormula}
              onSelectFormula={setSelectedFormula}
              selectedTone={selectedTone}
              onSelectTone={setSelectedTone}
            />
          </div>

          {/* Active Filters Summary indicator */}
          {(selectedFormula !== '전체' ||
            selectedTone !== '전체' ||
            searchQuery ||
            onlyLiked) && (
            <div className="flex items-center justify-between text-[11px] text-[#787878] px-1">
              <div className="flex items-center gap-1 flex-wrap">
                <span>적용 필터:</span>
                {selectedFormula !== '전체' && (
                  <span className="px-2 py-0.5 bg-[#E26A74]/10 text-[#E26A74] font-semibold rounded-md">
                    {selectedFormula}
                  </span>
                )}
                {selectedTone !== '전체' && (
                  <span className="px-2 py-0.5 bg-[#1E1E1E]/10 text-[#1E1E1E] font-semibold rounded-md">
                    {selectedTone}
                  </span>
                )}
                {onlyLiked && (
                  <span className="px-2 py-0.5 bg-rose-100 text-rose-700 font-semibold rounded-md">
                    위시리스트만
                  </span>
                )}
                {searchQuery && (
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-800 font-semibold rounded-md">
                    &quot;{searchQuery}&quot;
                  </span>
                )}
              </div>
              <button
                onClick={handleResetFilters}
                className="text-[#E26A74] hover:underline font-semibold text-[11px] shrink-0"
              >
                전체 초기화
              </button>
            </div>
          )}

          {/* Product Grid Content / Loading / Empty State */}
          {isLoading ? (
            <SkeletonGrid />
          ) : filteredProducts.length > 0 ? (
            /* Responsive Product Card Grid (2 cols base ~390px, 3 cols tablet, 4 cols desktop) */
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 pt-1">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={setSelectedProduct}
                  isLiked={likedIds.includes(product.id)}
                  onToggleLike={(e) => handleToggleLike(e, product.id)}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <EmptyState
              onResetFilters={handleResetFilters}
              query={searchQuery}
            />
          )}
        </main>
      </div>

      {/* Adaptive Bottom Sheet Modal */}
      <DetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onCopyHex={handleCopyHex}
        isLiked={selectedProduct ? likedIds.includes(selectedProduct.id) : false}
        onToggleLike={() => handleToggleLike()}
        onShare={handleShare}
      />

      {/* Hex Copy & Wishlist Toast Notification */}
      <Toast toast={toast} />
    </div>
  );
}

export default App;
