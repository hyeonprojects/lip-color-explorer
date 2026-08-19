# 💄 Lip Color Explorer (립 컬러 탐색 웹앱)

18~25세 여성 타깃을 고려한 모바일 퍼스트 립 컬러 탐색 및 실발색 확인 웹 애플리케이션입니다.

🔗 **배포 링크:** [https://lip-color-explorer.pages.dev/](https://lip-color-explorer.pages.dev/)

---

## 기술 스택

- **Framework & Language:** React 19, TypeScript
- **Build Tool:** Vite
- **Styling & UI:** Tailwind CSS v4, Lucide React (Icons)
- **Deployment:** Cloudflare Pages

---

## 작업 방식 및 이유

- 2026년 8월 19일 오후 12시 18분 부터 시작해서 13시 03분에 끝냈습니다.
- 처음에 과제 분석을 하는데 시간을 쏟아부었습니다. 1시간 내외라는 미션이 있었기에 AI 툴을 이용해서 미션의 기본기를 충실히 할려고 했습니다.
- 처음에 github를 통해서 repo 만들고 pnpm + vite + react + typescript 기반으로 프로젝트를 진행하였습니다. (pnpm을 사용한 이유는 예전 프로젝트에 비해서 의존성을 효율적으로 설치하고 관리할 수 있다고 판단했습니다.)
- Gemini와 논의를 통해서 DESIGN.md를 만들어서 가다듬었고, 18세~25세 여성 타깃을 고려하여서 모바일 퍼스트를 고려하여서 작업을 하였습니다. (개인적으로 제품 만들때 쓰는 프롬프트를 이용해서 색깔 팔레트 고려하고, 기능 고려, 유저군에 맞추어서 간단히 고려하였습니다.)
- 시간이 부족한 미션이라고 생각해서 DESIGN.md 시스템과 요구사항을 구체화 하여서 agy에 맡겼습니다.
- 일부 잘못 알아 듣는 부분을 보간하고 나서 cloudflare의 page 배포 환경을 구축하였습니다.
- 필터 및 기본 화면 기능에 문제 없는지 QA 하였습니다.

---

## 구현하면서 가장 신경 쓴 부분

기능은 AI가 심플하게 만들 수 있기에 제품적으로 요구사항에 맞추어서 작업을 완수했냐를 우선적으로 보았습니다. 특히나 특정 나이 타겟을 고려한 디자인을 짧은 시간안에 고려하기 위해서 DESIGN.md에 조금 더 시간을 투자하였습니다.
