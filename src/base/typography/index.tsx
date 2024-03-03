import c from "clsx";

import styles from "./style.module.css";

type t =
  | "caption2"
  | "caption2Strong"
  | "caption1"
  | "caption1Strong"
  | "caption1Stronger"
  | "body1"
  | "body1Strong"
  | "body1Stronger"
  | "body2"
  | "subtitle2"
  | "subtitle2Stronger"
  | "subtitle1"
  | "title3"
  | "title2"
  | "title1"
  | "largeTitle"
  | "display";

// eslint-disable-next-line no-var
export var s = styles as Record<t, string>;

/*
  // Usage example:

  import withTypography from "~/base/typography";
  import styles from "./style.module.css";

  const typography = withTypography({
    header: [styles.titleX, "title3"],
    paragraph: "subtitle2",
  });

  <h1 class={typography.header}>...</h1>
  <p class={typography.paragraph}>...</p>
*/

function make<T extends Record<string, t | [string, t]>>(
  params: T
): Readonly<{ [Property in keyof T]: string }> {
  return Object.freeze(
    Object.entries(params).reduce(
      (p, [k, value]) => (
        (p[k] =
          typeof value === "string"
            ? s[value]
            : c(value.at(0), s[value.at(1) as t])),
        p
      ),
      Object.create(null)
    )
  );
}

export default make;
