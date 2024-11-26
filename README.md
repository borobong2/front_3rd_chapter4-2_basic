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

| [PageSpeed](https://pagespeed.web.dev/analysis/https-d3gs3udtp7lhml-cloudfront-net/9m3bzso30h?form_factor=mobile)               | [Git Issue (Lighthouse)](https://github.com/borobong2/front_3rd_chapter4-2_basic/issues/1)                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img width="400" height="300" alt="init" src="https://github.com/user-attachments/assets/0bd8e70e-0b3d-4b31-a743-d5bc5d153966"> | <img width="400" height="300" alt="lighthouse workflow first issue" src="https://github.com/user-attachments/assets/29d17e8b-80d3-46b6-ad8e-8426f58120a8"> |

## 개선 방법

## 개선 후 향상된 지표

## 기타 등등
