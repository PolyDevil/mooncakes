import { component$ } from "@builder.io/qwik";
import c from "clsx";
import { type data } from "~/routes";

import Hero from "./hero";
import List from "./list";
import styles from "./style.module.css";

export { type t } from "~/routes";
export interface props {
  class?: string;
  data: data;
}

export default component$<props>((props) => {
  return (
    <section class={c(styles.rootX, props.class)}>
      <Hero class={styles.heroX} />
      <List data={props.data} />
    </section>
  );
});
