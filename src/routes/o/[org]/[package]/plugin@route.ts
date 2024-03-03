import { Segment } from "~/utils/route";
import {
  type params as parentParams,
  Route,
  base as baseParent,
} from "../plugin@route";

export { Route, base } from "../plugin@route";

export interface params extends parentParams {
  package: string;
}

export function toBreadcrumbList(org: Segment.i, packageSegment: Segment.i) {
  return Segment.toBreadcrumbList(Segment.push(Route, org, packageSegment));
}

export function router(params: params, segment?: string) {
  if (typeof segment === "string" && segment.length > 0) {
    return `${baseParent}${params.org}/${params.package}/${segment}/`;
  }

  return `${baseParent}${params.org}/${params.package}/`;
}
