# 💄 Lip Color Explorer - Design System Specification (`DESIGN.md`)

> **Target Audience:** 18–25 Korean Female Demographic (K-Beauty High-Involvement Group)  
> **Brand Mood:** Minimal, Sophisticated, Clean Beauty (Hince, Laka, Dasique Aesthetic)  
> **Theme Policy:** Light Mode Fixed (립 컬러 고유의 명도·채도 왜곡 방지를 위해 라이트 테마 고정)  
> **Architecture:** Mobile-First Responsive Design (Base: 390px Viewport → Responsive up to 1200px)

---

## 1. Design Principles

1. **Canvas Neutrality (배경의 절제):**  
   UI 캔버스는 은은하고 차분한 파우더리 베이지(`--bg-app: #FBFBFA`)를 유지하여, 립스틱의 발색과 제형 텍스처가 가장 돋보이도록 설계합니다.
2. **True-to-Life Color Fidelity (정확한 발색 전달):**  
   어떤 배경에서도 색상이 묻히거나 왜곡되지 않도록 고명도 스와치에는 미세 테두리(Micro-border)를 부여하고, 시스템 다크모드 반전 영향을 받지 않도록 라이트 테마를 고정합니다.
3. **Mobile-First Ergonomics & Safe Area (엄지 조작 및 안전 영역 최적화):**  
   필터, 검색, 바텀시트 등 핵심 인터랙션은 한 손 조작 반경(Thumb Zone) 내에 배치하며, iOS 하단 홈 바(Safe Area Inset)를 필수로 대응합니다.

---

## 2. Design Tokens & Variables

### 2.1 Color Palette
```css
:root {
  /* Surface & Background */
  --bg-app: #FBFBFA;         /* Soft Powdery Beige */
  --bg-card: #FFFFFF;        /* Pure Clean White */
  --bg-subtle: #F5F4F2;      /* Input & Pill Inactive Background */
  
  /* Text & Typography */
  --text-primary: #1E1E1E;   /* Soft Obsidian Black */
  --text-secondary: #787878; /* Muted Neutral Gray */
  --text-tertiary: #A6A6A6;  /* Placeholder & Light Meta */
  
  /* Brand Accents */
  --accent-rose: #E26A74;    /* Vibrant Rose Coral (Primary Highlight) */
  --accent-light: #FDF2F3;   /* Soft Rose Tint (Badge / Hover) */
  --accent-hover: #D15560;   /* Pressed State Rose */

  /* Borders & Dividers */
  --border-subtle: #EFEFEF;  /* Ultra-light Card Border */
  --border-divider: #E5E5E3; /* Section Divider */

  /* Formula Badge Tokens */
  --badge-matte-bg: #F3F4F6;     --badge-matte-text: #4B5563;
  --badge-glossy-bg: #EFF6FF;    --badge-glossy-text: #2563EB;
  --badge-velvet-bg: #FDF2F8;    --badge-velvet-text: #DB2777;

  /* Personal Color Tone Badge Tokens */
  --badge-warm-bg: #FFF7ED;      --badge-warm-text: #C2410C;   /* Warm Tone */
  --badge-cool-bg: #F5F3FF;      --badge-cool-text: #7C3AED;   /* Cool Tone */
  --badge-mute-bg: #F3F4F6;      --badge-mute-text: #64748B;   /* Mute Tone */
}

```

### 2.2 Layering & Z-Index Tokens

```css
:root {
  --z-base: 0;
  --z-sticky: 10;     /* Sticky Header & Filter Bar */
  --z-backdrop: 40;   /* Modal Dim Overlay */
  --z-modal: 50;      /* Bottom Sheet & Centered Dialog */
  --z-toast: 100;     /* Hex Copy Toast Notification */
}

```

### 2.3 Typography Scale

* **Font Family:** `Pretendard`, `-apple-system`, `BlinkMacSystemFont`, `system-ui`, `sans-serif`

| Level | Size | Weight | Line Height | Letter Spacing | Usage |
| --- | --- | --- | --- | --- | --- |
| **Display Title** | `20px` (`1.25rem`) | `700 (Bold)` | `1.3` | `-0.02em` | App Header, Hero Title |
| **Section Title** | `16px` (`1.0rem`) | `600 (SemiBold)` | `1.35` | `-0.01em` | Modal Headers, Filter Group Title |
| **Product Brand** | `10px` (`0.625rem`) | `600 (SemiBold)` | `1.2` | `+0.05em` | Brand Label (UPPERCASE) |
| **Product Name** | `13px` (`0.8125rem`) | `600 (SemiBold)` | `1.35` | `-0.01em` | Product Title |
| **Color Meta** | `11px` (`0.6875rem`) | `400 (Regular)` | `1.3` | `0` | Color Name, Hex Code |
| **Price** | `13px` (`0.8125rem`) | `700 (Bold)` | `1.2` | `-0.01em` | Price Tag (`18,000원`) |
| **Badge / Caption** | `10px` (`0.625rem`) | `500 (Medium)` | `1.2` | `0` | Formula / Tone Pills, Tags |

### 2.4 Spacing & Radius Tokens

* **Radius Small:** `6px` (Badges, Swatch micro-chips)
* **Radius Medium:** `12px` (Product Cards, Inputs)
* **Radius Large:** `20px` (Filter Pills, Modals)
* **Radius Full:** `9999px` (Swatches, Buttons, Pill Badges)
* **Shadow Soft:** `0 4px 20px -2px rgba(0, 0, 0, 0.04)`
* **Shadow Card Hover:** `0 8px 24px -4px rgba(0, 0, 0, 0.08)`
* **Shadow Modal:** `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)`

---

## 3. Responsive Breakpoint & Grid System

```
[Mobile Base] (390px - 767px)  --> 2 Columns Grid (Gap: 12px)
[Tablet]      (768px - 1023px) --> 3 Columns Grid (Gap: 16px)
[Desktop]     (1024px - 1280px)--> 4 Columns Grid (Gap: 20px, Max-Width: 1120px Centered)

```

### Layout Code Rules (Tailwind CSS)

* **Root Shell Container:**
```html
<div class="min-h-screen bg-[#FBFBFA] text-[#1E1E1E] antialiased">
  <div class="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 pb-[calc(1rem+env(safe-area-inset-bottom))]">
    <!-- App Content -->
  </div>
</div>

```


* **Product Grid Wrapper:**
```html
<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
  <!-- Product Cards / Skeletons -->
</div>

```



---

## 4. Component UI Specifications

### 4.1 Header & Navigation (`Header.tsx`)

* **Mobile View:** 고정형 스티키 탑바(`sticky top-0 z-[10] bg-[#FBFBFA]/90 backdrop-blur-md`). 브랜드 로고와 심플 검색 토글.
* **Desktop View:** 좌측 타이틀 로고, 우측 검색 인풋 필드 및 제품 카운트 통계.
* **Height:** `56px` (Mobile), `64px` (Desktop).

### 4.2 Multi-Filter Bar (`FilterBar.tsx`)

* **구조:** 가로 스크롤 가능한 필터 칩 묶음 (제형 + 톤 분기 지원)
* `[ 전체 ]` `[ 매트 ]` `[ 글로시 ]` `[ 벨벳 ]` `|` `[ 웜톤 ]` `[ 쿨톤 ]` `[ 뮤트 ]`


* **Active State:**
* Background: `#E26A74` (Rose Coral)
* Text: `#FFFFFF` (White)
* Shadow: `shadow-sm`


* **Inactive State:**
* Background: `#FFFFFF`
* Text: `#787878`
* Border: `1px solid #EFEFEF`
* Hover: Background `#F5F4F2`, Text `#1E1E1E`


* **Focus Visible:** `focus-visible:ring-2 focus-visible:ring-[#E26A74] focus-visible:outline-none`

### 4.3 Product Card (`ProductCard.tsx`)

* **Container:**
* Background: `#FFFFFF`
* Border: `1px solid #EFEFEF`
* Radius: `rounded-xl`
* Padding: `p-3`
* Transition: `transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer`


* **Thumbnail Image:**
* Ratio: `aspect-square (1:1)`
* Style: `w-full rounded-lg object-cover bg-neutral-100`


* **Color Swatch Section (Hero Sub-component):**
* Swatch Circle: `w-4 h-4 rounded-full border border-black/10 shadow-inner flex-shrink-0`
* Swatch Luminance Guard: 명도(Luminance) > 0.85인 경우 `border border-neutral-300` 강제 적용
* Color Name: `text-[11px] text-[#555555] font-medium truncate`


* **Product Info:**
* Brand: `text-[10px] uppercase font-semibold text-[#787878] tracking-wider`
* Product Name: `text-[13px] font-semibold text-[#1E1E1E] line-clamp-1`
* Badges Group (Flex wrap, gap-1):
* Formula Badge: `px-1.5 py-0.5 text-[10px] font-medium rounded` (제형별 스타일)
* Tone Badge: `px-1.5 py-0.5 text-[10px] font-medium rounded` (웜/쿨/뮤트 스타일)


* Price: `text-[13px] font-bold text-[#1E1E1E]`



### 4.4 Adaptive Detail Modal (`DetailModal.tsx`)

* **Behavior:**
* **Mobile (< 768px):** 하단에서 슬라이드 업되는 **Bottom Sheet**
* Style: `fixed inset-x-0 bottom-0 z-[50] rounded-t-3xl bg-white p-5 max-h-[85vh] overflow-y-auto pb-[calc(1.5rem+env(safe-area-inset-bottom))] animate-in slide-in-from-bottom`
* Drag Indicator: 최상단 상단바 `w-10 h-1 bg-neutral-200 rounded-full mx-auto mb-4`


* **Desktop (≥ 768px):** 화면 중앙 팝업 **Centered Dialog**
* Style: `fixed inset-0 z-[50] m-auto max-w-md h-fit max-h-[90vh] rounded-2xl bg-white p-6 shadow-2xl`




* **Content Layout:**
* Large Aspect 1:1 Image (`rounded-xl`).
* Magnified Color Swatch Chip (`w-10 h-10 rounded-full border-2 border-white shadow-md`).
* Hex Code Display with One-Click Copy:
* Code Box: `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F5F4F2] text-[12px] font-mono font-medium text-[#1E1E1E] hover:bg-[#EFEFEF] transition-colors cursor-pointer`


* Texture & Finish Description ("부드럽게 밀착되는 보송한 벨벳 피니시").



### 4.5 State Views & Fallback (`StateViews.tsx`)

* **Skeleton Loading Card:**
* Card Shell: `rounded-xl p-3 bg-white border border-[#EFEFEF] animate-pulse space-y-2.5`
* Image Placeholder: `aspect-square w-full rounded-lg bg-neutral-200`
* Text Lines Placeholder: `h-3 bg-neutral-200 rounded w-2/3`, `h-4 bg-neutral-200 rounded w-full`, `h-3 bg-neutral-200 rounded w-1/3`


* **Empty State (검색/필터 결과 없음):**
* Container: `py-16 text-center space-y-3`
* Text: `text-[14px] text-[#787878] font-medium` ("조건에 맞는 립 컬러를 찾지 못했어요.")
* Reset Button: `px-4 py-2 text-[12px] font-semibold text-[#E26A74] bg-[#FDF2F3] rounded-full hover:bg-[#FCE7E9] transition-colors`


* **Image Error Fallback:**
* 립스틱 이미지 로드 실패 시 디폴트 컬러 실루엣 아이콘과 소프트 뉴트럴 배경(`bg-neutral-100`) 자동 노출.



### 4.6 Toast Notification (`Toast.tsx`)

* **Usage:** 컬러 Hex 코드 복사 완료 피드백.
* **Position:** `fixed bottom-6 inset-x-0 mx-auto w-fit z-[100] mb-[env(safe-area-inset-bottom)]`
* **Style:** `px-4 py-2 bg-[#1E1E1E]/90 backdrop-blur text-white text-[12px] font-medium rounded-full shadow-lg flex items-center gap-1.5 animate-in fade-in slide-in-from-bottom-2`
* **Duration:** `2000ms` 후 부드럽게 Fade-out.

---

## 5. Micro-Interactions & Accessibility

1. **Touch Target Accessibility:** 모든 탭 가능한 요소(필터 칩, 카드, 복사 버튼)는 최소 터치 영역 `40px x 40px` 이상 확보.
2. **Keyboard Navigation & Focus Ring:** 키보드 이동 시 `focus-visible:ring-2 focus-visible:ring-[#E26A74] focus-visible:ring-offset-2` 스타일 명시.
3. **Swatch Visibility Guarantee:** 밝기(Luminance) > 0.85의 페일 핑크, 누드 베이지 스와치는 1px 아웃라인 테두리 필수 유지.
4. **Natural Motion Curve:** 바텀시트 슬라이드 및 모달 팝업 시 `cubic-bezier(0.16, 1, 0.3, 1)` 이징 곡선을 적용하여 부드럽고 고급스러운 감성 구현.
