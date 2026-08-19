export type FormulaType = '전체' | '매트' | '글로시' | '벨벳';
export type ToneType = '전체' | '웜톤' | '쿨톤' | '뮤트';

export interface RawLipData {
  id: number;
  brand: string;
  name: string;
  colorName: string;
  hex: string;
  finish: '매트' | '글로시' | '벨벳';
  price: number;
  imageUrl: string;
}

export interface LipProduct {
  id: string | number;
  brand: string;
  name: string;
  colorName: string;
  formula: '매트' | '글로시' | '벨벳';
  finish: '매트' | '글로시' | '벨벳';
  hexColor: string;
  hex: string;
  price: number;
  imageUrl: string;
  tone?: '웜톤' | '쿨톤' | '뮤트';
  description?: string;
  tags?: string[];
  recommendation?: string;
}

export interface ToastMessage {
  id: string;
  text: string;
  type?: 'success' | 'info';
}
