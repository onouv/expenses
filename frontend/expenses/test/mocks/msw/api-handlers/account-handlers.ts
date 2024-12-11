import { http, HttpHandler, HttpResponse } from "msw";
import config from "@/app-config.json";

const url = config.backend.accounts.create;

const handlers: HttpHandler[] = [
  http.post(url, async ({ request }) => {
    // const dto = await request.json();
    // console.log(`POST ${url}: `, dto);
    return new HttpResponse(null, { status: 201 });
  }),
];

export default handlers;
