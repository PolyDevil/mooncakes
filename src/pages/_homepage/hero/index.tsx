import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import c from "clsx";
import withTypography from "~/base/typography";
import withLiton from "~/base/liton";
import image from "~/media/mooncake.png";

import styles from "./style.module.css";

export interface props {
  class?: string;
}

const typography = withTypography({
  title: "title1",
  body: "title1",
});

const liton = withLiton({
  install: {
    size: "large",
    shape: "circular",
    appearance: "primary",
  },
  gettingStarted: {
    size: "large",
    shape: "circular",
    appearance: "ghost",
  },
});

export default component$<props>((props) => {
  return (
    <section class={c(styles.rootX, props.class)}>
      <h1 class={typography.title}>
        Hi! This is
        <br />
        <em>mooncakes.</em>
      </h1>

      <p class={typography.body}>
        The centralized MoonBit package management platform.
      </p>

      <Link href="https://www.moonbitlang.com/download/" class={liton.install}>
        Install Moon
      </Link>
      <Link
        href="https://www.moonbitlang.com/docs/package-manage-tour"
        class={liton.gettingStarted}
      >
        Getting Started
      </Link>

      <img src={image} alt="mooncake" width="1024" height="1024" />
    </section>
  );
});
