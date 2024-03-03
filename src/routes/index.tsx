import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import ToError from "~/utils/error";
import { guard } from "~/utils/switch";

import Page from "~/pages/_homepage";

namespace Modules {
  export const uri = "https://mooncakes.io/docs/modules.json";

  export interface input {
    name: string;
    version: string;
    description?: string;
    readme?: string;
    homepage?: string;
    repository?: string;
    license?: string;
    keywords: Array<string>;
    checksum: string;
    created_at?: Date;
  }

  export interface output extends input {
    author: string;
  }

  export const format = (data: Array<input>) => {
    const preprocessed = data
      .map((e) => {
        const [author, name] = e.name.split("/");
        // @ts-ignore
        e.author = author;
        e.name = name;
        return e as output;
      })
      .sort((x, y) =>
        x.name.localeCompare(y.name, "en", {
          sensitivity: "base",
          ignorePunctuation: true,
        })
      );

    const byLetter = new Map();

    for (const el of preprocessed) {
      const startsWith = el.name.at(0)!.toLowerCase();

      if (byLetter.has(startsWith)) {
        byLetter.get(startsWith).push(el);
      } else {
        byLetter.set(startsWith, [el]);
      }
    }

    return Array.from(byLetter.entries()) as Array<[string, Array<output>]>;
  };
}

export const useData = routeLoader$(async () => {
  try {
    const response = await fetch(Modules.uri, {
      method: "get",
      headers: {
        "content-type": "application/json",
      },
    });

    switch (response.status) {
      case 200: {
        const maybeJson = await response.json();

        if (typeof maybeJson !== "object") {
          throw new Error(`[${response.status}] could not parse response`);
        }

        if (
          !(
            Object.hasOwn(maybeJson, "modules") &&
            Array.isArray(maybeJson.modules)
          )
        ) {
          throw new Error(
            `[${response.status}] response does not match expected schema`
          );
        }

        return {
          type: "data",
          data: Modules.format(maybeJson.modules),
        } as const;
      }

      default: {
        const maybeJson = await response.json();

        if (typeof maybeJson !== "object") {
          throw new Error(`[${response.status}] error`);
        }

        throw new Error(`[${response.status}] could not parse response`);
      }
    }
  } catch (maybeError: unknown) {
    return {
      type: "error",
      message: ToError(maybeError).message,
    } as const;
  }
});

export type t = Modules.output;
export type data = Array<[string, Array<t>]>;

export default component$(() => {
  const signal = useData();

  switch (signal.value.type) {
    case "data": {
      return <Page data={signal.value.data} />;
    }
    case "error": {
      return null;
    }
    default: {
      return guard(signal.value);
    }
  }
});

export const head: DocumentHead = {
  title: "Mooncakes | Home",
  meta: [
    {
      name: "description",
      content: "Search for packages on Mooncakes.io",
    },
  ],
};
