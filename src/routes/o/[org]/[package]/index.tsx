import { component$ } from "@builder.io/qwik";
import {
  type DocumentHead,
  useLocation,
  routeLoader$,
} from "@builder.io/qwik-city";

import Page from "~/pages/o/[package]";

import { type params } from "./plugin@route";

export const useMenu = routeLoader$(async (requestEvent) => {
  const params = requestEvent.params as unknown as params;

  const data = await fetch(
    `https://mooncakes.io/docs/${params.org}/${params.package}/_sidebar.md`
  );

  const blob = await data.blob();

  return blob.text();
});

export const useUserContent = routeLoader$(async (requestEvent) => {
  const params = requestEvent.params as unknown as params;

  const data = await fetch(
    `https://mooncakes.io/docs/${params.org}/${params.package}/README.md`
  );

  const blob = await data.blob();
  return blob.text();
});

export default component$(() => {
  const loc = useLocation();
  const params = structuredClone(loc.params) as unknown as params;
  const menu = useMenu();
  const userContent = useUserContent();

  return (
    <Page params={params}>
      <div q:slot="menu" dangerouslySetInnerHTML={menu.value} />
      <div q:slot="content" dangerouslySetInnerHTML={userContent.value} />
    </Page>
  );
});

export const head: DocumentHead = (props) => {
  const params = props.params as unknown as params;
  // const data = props.resolveValue(useData);

  return {
    title: `Mooncakes | ${params.package}`,
    meta: [
      {
        name: "description",
        content: "Search for packages on Mooncakes.io",
      },
    ],
  };
};
