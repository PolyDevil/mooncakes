import { Segment } from "~/utils/route";
import { Route, base as baseParent } from "../plugin@route";

export { Route, base } from "../plugin@route";

export interface params {
  org: string;
}

export function toBreadcrumbList(org: Segment.i) {
  return Segment.toBreadcrumbList(Segment.push(Route, org));
}

export const route = (segment: string) => `${baseParent}${segment}/`;

export function router(params: params, segment?: string) {
  if (typeof segment === "string" && segment.length > 0) {
    return `${baseParent}${(params as unknown as params).org}/${segment}/`;
  }

  return `${baseParent}${(params as unknown as params).org}/`;
}
