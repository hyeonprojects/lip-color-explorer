import React, { useState } from 'react';
import { LipProduct } from '../types/lip';
import { isHighLuminance, formatKRW } from '../utils/color';
import { Heart } from 'lucide-react';

interface ProductCardProps {
  product: LipProduct;
  onSelect: (product: LipProduct) => void;
  isLiked?: boolean;
  onToggleLike?: (e: React.MouseEvent, productId: string | number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  isLiked = false,
  onToggleLike,
}) => {
  const [imageError, setImageError] = useState(false);
  const colorHex = product.hexColor || product.hex;
  const finishType = product.formula || product.finish;
  const isLight = isHighLuminance(colorHex);

  // Formula Badge style lookup
  const formulaStyleMap: Record<string, string> = {
    매트: 'bg-[#F3F4F6] text-[#4B5563]',
    글로시: 'bg-[#EFF6FF] text-[#2563EB]',
    벨벳: 'bg-[#FDF2F8] text-[#DB2777]',
  };

  // Tone Badge style lookup
  const toneStyleMap: Record<string, string> = {
    웜톤: 'bg-[#FFF7ED] text-[#C2410C]',
    쿨톤: 'bg-[#F5F3FF] text-[#7C3AED]',
    뮤트: 'bg-[#F3F4F6] text-[#64748B]',
  };

  return (
    <div
      onClick={() => onSelect(product)}
      className="group bg-white border border-[#EFEFEF] rounded-xl p-3 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer select-none relative"
    >
      <div>
        {/* Thumbnail Image Container */}
        <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-[#F5F4F2] mb-2.5">
          {!imageError ? (
            <img
              src={product.imageUrl}
              alt={`${product.brand} ${product.name}`}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            /* Fallback SVG representation with product Hex color */
            <div
              className="w-full h-full flex flex-col items-center justify-center p-4"
              style={{
                background: `radial-gradient(circle, ${colorHex}25 0%, #F5F4F2 80%)`,
              }}
            >
              <div
                className="w-12 h-12 rounded-full shadow-md border-2 border-white mb-2"
                style={{ backgroundColor: colorHex }}
              />
              <span className="text-[10px] text-[#787878] font-medium text-center">
                {product.colorName}
              </span>
            </div>
          )}

          {/* Wishlist Heart Button */}
          {onToggleLike && (
            <button
              onClick={(e) => onToggleLike(e, product.id)}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 backdrop-blur-xs text-[#787878] hover:text-[#E26A74] hover:bg-white transition-all shadow-2xs"
              aria-label="위시리스트 저장"
            >
              <Heart
                className={`w-3.5 h-3.5 ${
                  isLiked ? 'fill-[#E26A74] text-[#E26A74]' : ''
                }`}
              />
            </button>
          )}

          {/* Hex Swatch Floating Chip */}
          <div className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs shadow-2xs border border-black/5">
            <span
              className={`w-3 h-3 rounded-full shrink-0 ${
                isLight ? 'border border-neutral-300' : 'border border-black/10'
              }`}
              style={{ backgroundColor: colorHex }}
            />
            <span className="text-[10px] font-mono font-medium text-[#1E1E1E]">
              {colorHex}
            </span>
          </div>
        </div>

        {/* Product Brand & Title */}
        <div className="space-y-0.5 mb-1.5">
          <p className="text-[10px] uppercase font-semibold text-[#787878] tracking-wider">
            {product.brand}
          </p>
          <h3 className="text-[13px] font-semibold text-[#1E1E1E] line-clamp-1 leading-snug">
            {product.name}
          </h3>
        </div>

        {/* Color Name + Swatch Indicator */}
        <div className="flex items-center gap-1.5 mb-2">
          <span
            className={`w-2.5 h-2.5 rounded-full shrink-0 ${
              isLight ? 'border border-neutral-300' : 'border border-black/10'
            }`}
            style={{ backgroundColor: colorHex }}
          />
          <span className="text-[11px] font-medium text-[#555555] truncate">
            {product.colorName}
          </span>
        </div>

        {/* Badges Row */}
        <div className="flex flex-wrap items-center gap-1 mb-2.5">
          <span
            className={`px-1.5 py-0.5 text-[10px] font-medium rounded ${
              formulaStyleMap[finishType] || 'bg-gray-100 text-gray-700'
            }`}
          >
            {finishType}
          </span>
          {product.tone && (
            <span
              className={`px-1.5 py-0.5 text-[10px] font-medium rounded ${
                toneStyleMap[product.tone] || 'bg-gray-100 text-gray-700'
              }`}
            >
              {product.tone}
            </span>
          )}
        </div>
      </div>

      {/* Price */}
      <div className="pt-1 border-t border-[#EFEFEF] flex items-center justify-between">
        <span className="text-[13px] font-bold text-[#1E1E1E]">
          {formatKRW(product.price)}
        </span>
        <span className="text-[10px] text-[#A6A6A6] group-hover:text-[#E26A74] font-medium transition-colors">
          상세보기 →
        </span>
      </div>
    </div>
  );
};
