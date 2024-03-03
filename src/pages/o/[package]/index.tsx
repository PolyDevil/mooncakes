import { component$, Slot } from "@builder.io/qwik";
import c from "clsx";
import { type params } from "~/routes/o/[org]/[package]/plugin@route";

import styles from "./style.module.css";

export interface props {
  class?: string;
  params: params;
}

export default component$<props>((props) => {
  return (
    <section class={c(styles.rootX, props.class)}>
      <div id="menu">
        <Slot name="menu" />
      </div>

      <div id="content">
        <Slot name="content" />
      </div>
    </section>
  );
});
