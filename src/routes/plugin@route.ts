import { Segment } from "~/utils/route";

export const Route = Segment.createRoot({
  name: "Home",
  back: "Back to homepage",
  uri: ``,
});

export const breadcrumbList = Segment.toBreadcrumbList(Route);

export const base = Segment.uri(breadcrumbList)!;
