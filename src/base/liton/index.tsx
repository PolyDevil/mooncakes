import c from "clsx";

import styles from "./style.module.css";

/*
  Liton is a clickable block, usually the styles are attached to <a /> or <button /> (for inline text looking-like links use <InlineLink /> component instead)
  LInk + butTON = liton
*/

type size = "extraSmall" | "small" | "medium" | "large" | "extraLarge";
type defaultSize = Extract<size, "medium">;

type shape = "circular" | "square" | "rounded";
type defaultShape = Extract<shape, "rounded">;

type appearance =
  | "subtle"
  | "outline"
  | "secondary"
  | "primary"
  | "ghost"
  | "light"
  | "transparent";
type defaultAppearance = Extract<appearance, "secondary">;

// eslint-disable-next-line no-var
var defaultParams = Object.freeze({
  size: "medium",
  shape: "rounded",
  appearance: "secondary",
}) satisfies Readonly<{
  size: defaultSize;
  shape: defaultShape;
  appearance: defaultAppearance;
}>;

type input = {
  size?: Exclude<size, defaultSize>;
  shape?: Exclude<shape, defaultShape>;
  appearance?: Exclude<appearance, defaultAppearance>;
};

// eslint-disable-next-line no-var
export var s = styles as Record<size | shape | appearance, string>;

/*
  // Usage example:

  import withLiton from "~/base/liton";
  import styles from "./style.module.css";

  const liton = withLiton({
    backlink: [styles.linkX, {
      size: "small",
      shape: "circular",
      appearance: "primary",
    }],
    submit: {
      size: "large",
      shape: "square",
      appearance: "ghost",
    },
  });

  <a class={liton.backlink}>...</a>
  <button class={liton.submit}>...</button>
*/

function make<T extends Record<string, input | [string, input]>>(
  params: T
): Readonly<{ [Property in keyof T]: string }> {
  return Object.freeze(
    Object.entries(params).reduce(
      (p, [k, value]) => (
        (p[k] = Array.isArray(value)
          ? c(
              value.at(0),
              styles.rootX,
              s[(value.at(1) as input).size || defaultParams.size],
              s[(value.at(1) as input).shape || defaultParams.shape],
              s[(value.at(1) as input).appearance || defaultParams.appearance]
            )
          : c(
              styles.rootX,
              s[value.size || defaultParams.size],
              s[value.shape || defaultParams.shape],
              s[value.appearance || defaultParams.appearance]
            )),
        p
      ),
      Object.create(null)
    )
  );
}

export default make;
