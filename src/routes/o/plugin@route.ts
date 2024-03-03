import { Segment } from "~/utils/route";
import { Route as parent, base as parentBase } from "../plugin@route";

export const segment = Segment.create({
  name: "Packages by organisation or user",
  back: "To packages by organisation or user",
  uri: `o`,
});

export const Route = Segment.push(parent, segment);

export const breadcrumbList = Segment.toBreadcrumbList(Route);

export const base = Segment.uri(breadcrumbList);

export const redirectURI = parentBase;
