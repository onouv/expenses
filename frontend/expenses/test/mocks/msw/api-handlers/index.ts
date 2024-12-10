import * as accountHandlers from "./account-handlers";
import { HttpHandler } from "msw";

const handlers: HttpHandler[] = [
  ...(accountHandlers as unknown as HttpHandler[]),
];

export default handlers;
