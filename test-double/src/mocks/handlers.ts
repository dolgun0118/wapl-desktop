import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/data", () =>
    HttpResponse.json([
      {
        name: "January",
        line1: 50,
        line2: 50,
        line3: 50,
      },
      {
        name: "February",
        line1: 500,
        line2: 400,
        line3: 300,
      },
    ])
  ),
];
