import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";

import Page from "~/pages/o/[org]";

export default component$(() => <Page />);

export const head: DocumentHead = {
  title: "Mooncakes | Packages by organisation",
  meta: [
    {
      name: "description",
      content: "Search for packages on Mooncakes.io",
    },
  ],
};
