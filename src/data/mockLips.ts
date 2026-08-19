import { LipProduct, RawLipData } from '../types/lip';
import dataJson from './data.json';

// Import raw JSON dataset from src/data/data.json
export const RAW_LIP_DATA: RawLipData[] = dataJson as RawLipData[];

// Tone mapping helper for K-Beauty UX filters
const toneMap: Record<number, '웜톤' | '쿨톤' | '뮤트'> = {
  1: '웜톤',
  2: '웜톤',
  3: '웜톤',
  4: '쿨톤',
  5: '웜톤',
  6: '쿨톤',
  7: '쿨톤',
  8: '웜톤',
  9: '뮤트',
  10: '쿨톤',
  11: '뮤트',
  12: '쿨톤'
};

const descMap: Record<number, string> = {
  1: '화사하게 피어나는 세비체 장미의 보송하고 매혹적인 벨벳 포뮬러.',
  2: '달콤 쌉싸름한 무화과 속살을 담아 깊고 그윽한 분위기의 딥 브라운 벨벳.',
  3: '입술에 맑고 탱글한 유리알 광택을 선사하는 상큼 생기 코랄 시럽 세럼.',
  4: '은은한 장미 빛깔로 스며들어 입술을 촉촉하게 물들이는 글로시 로즈 허니.',
  5: '자석처럼 강력하게 밀착되어 브릭 오렌지 컬러를 오랫동안 픽싱하는 매트 루즈.',
  6: '우아하고 오묘한 모브 핑크빛 필터를 씌운 듯 고발색 픽싱 매트.',
  7: '청량하게 입술 위에 펼쳐지는 맑고 선명한 체리 소다 워터 틴트.',
  8: '포근하고 부드러운 살구 크림 빛깔의 산뜻 보습 틴팅.',
  9: '깃털처럼 부드럽게 스쳐 지나가듯 감싸주는 그윽한 토프 로즈 스틱.',
  10: '고혹적인 고발색 딥 플럼 컬러가 선명하게 고정되는 무광 매트 스틱.',
  11: '사르르 블러링되어 부드러운 누드 피치 입술을 완성해 주는 블러 밤.',
  12: '상큼 발랄한 베리 펀치 과즙이 터지듯 촉촉함을 선사하는 세럼 글로시.'
};

export const MOCK_LIPS: LipProduct[] = RAW_LIP_DATA.map((item) => ({
  ...item,
  formula: item.finish,
  hexColor: item.hex,
  tone: toneMap[item.id] || '웜톤',
  description: descMap[item.id] || `${item.brand} ${item.name} (${item.colorName})`,
  tags: [item.brand, item.finish, item.colorName],
  recommendation: `${item.finish} 피니시 추천`
}));
