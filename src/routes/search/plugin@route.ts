import { Segment } from "~/utils/route";
import { Route as parent } from "../plugin@route";

export const segment = Segment.create({
  name: "Search",
  back: "To search",
  uri: `search`,
});

export const Route = Segment.push(parent, segment);

export const breadcrumbList = Segment.toBreadcrumbList(Route);

export const base = Segment.uri(breadcrumbList);

export function query(params: Record<string, string>) {
  if (Object.keys(params).length === 0) {
    return base;
  }

  return `${base}?${Object.entries(params)
    .reduce(
      (p, [k, v]) => (p.push(`${k}=${encodeURIComponent(v)}`), p),
      [] as Array<string>
    )
    .join("&")}`;
}
