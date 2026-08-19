import React, { useState, useEffect } from 'react';
import { LipProduct } from '../types/lip';
import { isHighLuminance, formatKRW } from '../utils/color';
import { X, Copy, Check, Heart, Share2, Sparkles, ShoppingBag } from 'lucide-react';

interface DetailModalProps {
  product: LipProduct | null;
  onClose: () => void;
  onCopyHex: (hex: string) => void;
  isLiked?: boolean;
  onToggleLike?: (productId: string | number) => void;
  onShare?: (product: LipProduct) => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  product,
  onClose,
  onCopyHex,
  isLiked = false,
  onToggleLike,
  onShare,
}) => {
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
    setCopied(false);
  }, [product]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [product]);

  if (!product) return null;

  const colorHex = product.hexColor || product.hex;
  const finishType = product.formula || product.finish;
  const isLight = isHighLuminance(colorHex);

  const handleCopy = () => {
    navigator.clipboard.writeText(colorHex);
    setCopied(true);
    onCopyHex(colorHex);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Dim Overlay Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[40] transition-opacity animate-fade-in"
        aria-hidden="true"
      />

      {/* Adaptive Modal Container */}
      {/* Mobile: Bottom Sheet (< md) | Desktop: Centered Dialog (>= md) */}
      <div className="fixed inset-x-0 bottom-0 md:inset-0 z-[50] md:m-auto md:max-w-md md:h-fit max-h-[90vh] bg-white rounded-t-3xl md:rounded-2xl shadow-2xl overflow-y-auto pb-[calc(1.5rem+env(safe-area-inset-bottom))] animate-slide-up flex flex-col">
        {/* Mobile Drag Handle Indicator */}
        <div className="md:hidden pt-3 pb-1 flex justify-center shrink-0">
          <div className="w-10 h-1 bg-neutral-200 rounded-full" />
        </div>

        {/* Header Bar */}
        <div className="px-5 py-3 flex items-center justify-between border-b border-[#EFEFEF] shrink-0 sticky top-0 bg-white/95 backdrop-blur-xs z-10">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-[#787878] uppercase tracking-wider">
              {product.brand}
            </span>
            <span className="text-[#E5E5E3]">•</span>
            <span className="text-[12px] font-medium text-[#1E1E1E]">
              {product.name}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#787878] hover:text-[#1E1E1E] hover:bg-[#F5F4F2] rounded-full transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-5 space-y-5 overflow-y-auto">
          {/* Main Hero Section: Product Image with Floating Swatch */}
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#F5F4F2] border border-[#EFEFEF] shadow-xs">
            {!imageError ? (
              <img
                src={product.imageUrl}
                alt={`${product.brand} ${product.name}`}
                onError={() => setImageError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex flex-col items-center justify-center p-6"
                style={{
                  background: `radial-gradient(circle, ${colorHex}35 0%, #F5F4F2 85%)`,
                }}
              >
                <div
                  className="w-24 h-24 rounded-full shadow-lg border-4 border-white mb-3"
                  style={{ backgroundColor: colorHex }}
                />
                <span className="text-[14px] text-[#1E1E1E] font-semibold">
                  {product.colorName}
                </span>
              </div>
            )}

            {/* Magnified Color Swatch Badge */}
            <div className="absolute bottom-3 left-3 flex items-center gap-2.5 px-3 py-2 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-black/5">
              <div
                className={`w-9 h-9 rounded-full shrink-0 shadow-md ${
                  isLight ? 'border-2 border-neutral-300' : 'border-2 border-white'
                }`}
                style={{ backgroundColor: colorHex }}
              />
              <div>
                <p className="text-[10px] text-[#787878] font-medium">발색 스와치</p>
                <p className="text-[13px] font-bold text-[#1E1E1E]">
                  {product.colorName}
                </p>
              </div>
            </div>
          </div>

          {/* Title & Hex Code Copy Bar */}
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold text-[#E26A74] uppercase tracking-wider">
                  {product.brand}
                </span>
                <h2 className="text-lg font-bold text-[#1E1E1E] leading-tight">
                  {product.name}
                </h2>
                <p className="text-sm font-medium text-[#787878]">
                  컬러: <strong className="text-[#1E1E1E]">{product.colorName}</strong>
                </p>
              </div>

              {/* Price Display */}
              <div className="text-right shrink-0">
                <p className="text-lg font-extrabold text-[#1E1E1E]">
                  {formatKRW(product.price)}
                </p>
                <span className="text-[10px] text-[#787878]">무료배송</span>
              </div>
            </div>

            {/* Hex Code Copy Pill */}
            <div className="pt-1 flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F5F4F2] text-[12px] font-mono font-semibold text-[#1E1E1E] hover:bg-[#EFEFEF] transition-colors shadow-2xs group"
                title="Hex 색상 코드 복사"
              >
                <span
                  className="w-3 h-3 rounded-full border border-black/10"
                  style={{ backgroundColor: colorHex }}
                />
                <span>HEX: {colorHex}</span>
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600 ml-1" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-[#787878] group-hover:text-[#1E1E1E] ml-1" />
                )}
              </button>
              {copied && (
                <span className="text-[11px] font-medium text-emerald-600 animate-fade-in">
                  복사완료!
                </span>
              )}
            </div>
          </div>

          {/* Badges Section */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-[#F3F4F6] text-[#4B5563]">
              제형: {finishType}
            </span>
            {product.tone && (
              <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-[#FFF7ED] text-[#C2410C]">
                퍼스널 톤: {product.tone}
              </span>
            )}
            {product.tags?.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-[#FDF2F3] text-[#E26A74]"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Texture & Description Card */}
          <div className="p-4 rounded-xl bg-[#FBFBFA] border border-[#EFEFEF] space-y-2">
            <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#1E1E1E]">
              <Sparkles className="w-3.5 h-3.5 text-[#E26A74]" />
              <span>텍스처 & 피니시 상세</span>
            </div>
            <p className="text-[13px] text-[#4A4A4A] leading-relaxed">
              {product.description || `${product.brand} ${product.name} ${product.colorName}`}
            </p>
            <div className="pt-2 border-t border-[#E5E5E3] flex items-center justify-between text-[11px]">
              <span className="text-[#787878]">마무리 피니시</span>
              <span className="font-semibold text-[#1E1E1E]">{finishType}</span>
            </div>
          </div>

          {/* Color Gradient Preview Strip */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#787878]">
              <span>립 톤 그라데이션 스펙트럼</span>
              <span className="text-[10px] text-[#A6A6A6] font-normal">그라데이션 → 풀 립</span>
            </div>
            <div
              className="h-7 w-full rounded-xl shadow-inner border border-black/10 transition-all overflow-hidden"
              style={{
                background: `linear-gradient(90deg, ${colorHex}30 0%, ${colorHex}80 50%, ${colorHex} 100%)`,
              }}
            />
            {product.recommendation && (
              <p className="text-[11px] text-[#787878] text-right font-medium">
                💡 {product.recommendation}
              </p>
            )}
          </div>
        </div>

        {/* Footer Action Buttons */}
        <div className="p-4 border-t border-[#EFEFEF] bg-white flex items-center gap-2 shrink-0">
          {/* Heart Button */}
          {onToggleLike && (
            <button
              onClick={() => onToggleLike(product.id)}
              className={`p-3 rounded-xl border transition-all ${
                isLiked
                  ? 'border-[#E26A74] bg-[#FDF2F3] text-[#E26A74]'
                  : 'border-[#EFEFEF] bg-white text-[#787878] hover:bg-[#F5F4F2]'
              }`}
              title="위시리스트 저장"
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-[#E26A74]' : ''}`} />
            </button>
          )}

          {/* Share Button */}
          {onShare && (
            <button
              onClick={() => onShare(product)}
              className="p-3 rounded-xl border border-[#EFEFEF] bg-white text-[#787878] hover:bg-[#F5F4F2] transition-colors"
              title="공유하기"
            >
              <Share2 className="w-5 h-5" />
            </button>
          )}

          {/* Purchase / Store Action */}
          <button
            onClick={() => handleCopy()}
            className="flex-1 py-3 px-4 rounded-xl bg-[#E26A74] hover:bg-[#D15560] text-white text-[13px] font-bold shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>컬러 코드 복사 및 탐색</span>
          </button>
        </div>
      </div>
    </>
  );
};
