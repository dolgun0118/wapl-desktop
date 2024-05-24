// setupTests.ts
import "@testing-library/jest-dom";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { JSDOM } from "jsdom";

const { window } = new JSDOM();
global.document = window.document;

const server = setupServer(
  // 요청에 대한 응답을 설정합니다.
  // 여기서는 /api/data 경로로의 GET 요청에 대해 응답을 설정합니다.
  // 예를 들어, JSON 형식의 데이터를 반환합니다.
  http.get("/api/data", () => {
    return HttpResponse.json([
      { label: "A", value: 10 },
      { label: "B", value: 20 },
      { label: "C", value: 30 },
    ]);
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  jest.clearAllMocks(); // 모든 mock 함수를 초기화합니다.
});
afterAll(() => {
  server.close();
  jest.restoreAllMocks(); // 모든 mock 함수를 복원합니다.
});
