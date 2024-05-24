import { setupWorker } from "msw/browser";
// import { se } from "msw"
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);
