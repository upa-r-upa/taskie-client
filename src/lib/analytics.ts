import ReactGA from "react-ga4";

/**
 * Google Analytics 초기화 함수
 * @param trackingId - GA4 측정 ID (G-XXXXXXXXXX 형식)
 */
export const initGA = (trackingId: string) => {
  // 개발 환경에서는 GA 추적을 건너뛸 수 있음 (선택 사항)
  if (import.meta.env.DEV) {
    console.log("GA 초기화: 개발 환경");
    return;
  }

  ReactGA.initialize(trackingId);
};

/**
 * 페이지 조회 이벤트 전송
 * @param path - 페이지 경로
 */
export const sendPageView = (path: string) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

/**
 * 사용자 정의 이벤트 전송
 * @param category - 이벤트 카테고리
 * @param action - 이벤트 액션
 * @param label - 이벤트 라벨 (선택사항)
 * @param value - 이벤트 값 (선택사항)
 */
export const sendEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};
