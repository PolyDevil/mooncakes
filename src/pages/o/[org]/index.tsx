import { component$ } from "@builder.io/qwik";
import c from "clsx";

import styles from "./style.module.css";

export interface props {
  class?: string;
}

export default component$<props>((props) => {
  return (
    <section class={c(styles.rootX, props.class)}>
      WIP List of packages by organisation
    </section>
  );
});
