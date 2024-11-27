# 바닐라 JS 프로젝트 성능 개선

- url: [https://d3gs3udtp7lhml.cloudfront.net/](https://d3gs3udtp7lhml.cloudfront.net/)

## 개선 이유

- 초기 성능 진단 결과, Performance(45점)와 Accessibility(81점) 모두 개선이 필요한 상황이었습니다.

### 특히 다음과 같은 주요 문제점들이 발견되었습니다

- 성능 이슈 :
  - `LCP(Largest Contentful Paint)`가 15.2초로 측정되어 느린 네트워크 환경에서 사용자 경험이 저하될 수 있는 상황
  - 이미지 최적화 부족
    - 히어로 이미지와 주요 콘텐츠 이미지가 비효율적인 포맷(JPG)과 최적화되지 않은 해상도로 제공
    - 이미지 크기가 크고 모든 이미지를 한 번에 로드하여 초기 렌더링 속도 저하
  - 폰트 및 CSS 비최적화
    - 외부 폰트 로드 시 과도한 네트워크 요청 발생
    - 불필요한 스타일 포함으로 인한 성능 저하
  - Lazy Loading 미적용
    - 초기 화면에 보이지 않는 이미지까지 모두 로드하여 불필요한 리소스 낭비
    - 사용자에게 당장 필요하지 않은 리소스까지 로드되어 페이지 로딩 속도 저하
- 접근성 문제

  - 스크린리더 사용자를 위한 이미지 대체텍스트 부재
  - 기타 웹 접근성 가이드라인 미준수

- 이러한 문제점들을 해결하여 모든 사용자가 더 빠르고 편리하게 서비스를 이용할 수 있도록 성능 및 접근성 개선 작업을 진행하게 되었습니다.

| [PageSpeed](https://pagespeed.web.dev/analysis/https-d3gs3udtp7lhml-cloudfront-net/9m3bzso30h?form_factor=desktop)              | [Git Issue (Lighthouse)](https://github.com/borobong2/front_3rd_chapter4-2_basic/issues/1)                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img width="400" height="300" alt="init" src="https://github.com/user-attachments/assets/ad2f3e86-89f0-4e83-9bfb-5e7228e41539"> | <img width="400" height="300" alt="lighthouse workflow first issue" src="https://github.com/user-attachments/assets/29d17e8b-80d3-46b6-ad8e-8426f58120a8"> |

## 개선 방법

### 1. 이미지 최적화

- **이미지 포맷 변경**: PNG → WebP 포맷으로 변경하여 이미지 용량 감소
- **반응형 이미지 처리**: `<picture>` 태그를 활용한 디바이스별 최적화된 이미지 제공

  ```html
  <picture>
    <source media="(max-width: 575px)" srcset="images/Hero_Mobile.webp" />
    <source media="(max-width: 960px)" srcset="images/Hero_Tablet.webp" />
    <img src="images/Hero_Desktop.webp" alt="VR 헤드셋" />
  </picture>
  ```

- **레이지 로딩**: 뷰포트 밖의 이미지는 지연 로딩 적용
- **히어로 이미지 프리로딩**: 핵심 이미지의 빠른 로딩을 위한 프리로드 적용

### 2. 레이아웃 안정성 개선

- **CLS(Cumulative Layout Shift) 감소**
  : `aspect-ratio` 속성을 사용하여 이미지 로딩 전에 공간을 미리 확보, 레이아웃 시프트 방지
  ```css
  .hero {
    aspect-ratio: 1024/476;
    width: 100%;
  }
  ```

### 3. SEO 최적화

- **메타 태그 보강**

  ```html
  <meta
    name="description"
    content="Discover our premium line of VR headsets. Find the perfect VR device for gaming, entertainment, and professional use."
  />
  <meta
    name="keywords"
    content="VR headset, virtual reality, VR gaming, Oculus, Apple VR"
  />
  ```

- **대체 텍스트 추가**: 모든 이미지에 의미 있는 `alt` 속성 부여

### 4. 리소스 로딩 최적화

- **폰트 로딩 개선**

  ```html
  <link
    rel="preload"
    href="fonts.css"
    as="style"
    onload="this.onload=null;this.rel='stylesheet'"
  />
  ```

- **스크립트 최적화**

  ```html
  <script src="main.js" defer></script>
  ```

- **DOM 로드 후 실행**

  ```javascript
  document.addEventListener("DOMContentLoaded", () => {
    // 초기화 코드
  });
  ```

### 5. 성능 모니터링

- Lighthouse를 통한 지속적인 성능 측정
- Core Web Vitals 지표 모니터링
- 사용자 경험 메트릭 추적

## 개선 후 향상된 지표

|        구분         |                                                                                                    개선 전                                                                                                    |                                                                                                   개선 후                                                                                                    |
| :-----------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|    **PageSpeed**    |                                                    ![초기 PageSpeed 점수](https://github.com/user-attachments/assets/ad2f3e86-89f0-4e83-9bfb-5e7228e41539)                                                    |                                                  ![개선된 PageSpeed 점수](https://github.com/user-attachments/assets/77c0b70e-97b4-4985-8ba7-81a8fd328bd5)                                                   |
|   **Lighthouse**    |                                                   ![초기 Lighthouse 결과](https://github.com/user-attachments/assets/29d17e8b-80d3-46b6-ad8e-8426f58120a8)                                                    |                                                  ![개선된 Lighthouse 결과](https://github.com/user-attachments/assets/b75bde95-43a9-43de-b1d9-828c9ea40492)                                                  |
|    **분석 링크**    | [PageSpeed 분석](https://pagespeed.web.dev/analysis/https-d3gs3udtp7lhml-cloudfront-net/9m3bzso30h?form_factor=desktop) / [Lighthouse 이슈](https://github.com/borobong2/front_3rd_chapter4-2_basic/issues/1) | [PageSpeed 분석](https://pagespeed.web.dev/analysis/https-d3gs3udtp7lhml-cloudfront-net/t8gjb22391?form_factor=desktop) / [Lighthouse 이슈](https://github.com/soyoonJ/front_3rd_chapter4-2_basic/issues/17) |
|    `Performance`    |                                                                                                      50                                                                                                       |                                                                                                 99 (`98%↑`)                                                                                                  |
|         FCP         |                                                                                                     0.7s                                                                                                      |                                                                                                0.2s (`71%↓`)                                                                                                 |
|         LCP         |                                                                                                     3.0s                                                                                                      |                                                                                                1.0s (`67%↓`)                                                                                                 |
| Total Blocking Time |                                                                                                     310ms                                                                                                     |                                                                                                40ms (`87%↓`)                                                                                                 |
|         CLS         |                                                                                                     0.477                                                                                                     |                                                                                                0.011 (`98%↓`)                                                                                                |
|   `Accessibility`   |                                                                                                      81                                                                                                       |                                                                                                 95 (`17%↑`)                                                                                                  |
|  `Best Practices`   |                                                                                                      96                                                                                                       |                                                                                                 100 (`4%↑`)                                                                                                  |
|        `SEO`        |                                                                                                      82                                                                                                       |                                                                                                 100 (`22%↑`)                                                                                                 |

## 학습한 점

### Core Web Vitals 최적화

- LCP(Largest Contentful Paint) 개선을 위한 이미지 최적화 방법
- CLS(Cumulative Layout Shift) 감소를 위한 레이아웃 안정화 기법
- FCP(First Contentful Paint) 최적화를 위한 리소스 로딩 전략

### 웹 성능 최적화 기법

- 이미지 포맷 선택이 성능에 미치는 영향
- 리소스 우선순위 설정의 중요성
- 레이아웃 시프트가 사용자 경험에 미치는 영향

## 참고 자료

- [Core Web Vitals](https://web.dev/vitals/)
- [이미지 최적화 가이드](https://web.dev/fast/#optimize-your-images)
- [웹 접근성 지침](https://www.w3.org/WAI/standards-guidelines/wcag/)
