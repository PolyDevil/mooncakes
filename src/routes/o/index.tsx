import { type RequestHandler, type RequestEvent } from "@builder.io/qwik-city";

import { redirectURI } from "./plugin@route";

export const onGet: RequestHandler = ({ redirect }: RequestEvent) => {
  throw redirect(302, redirectURI);
};
