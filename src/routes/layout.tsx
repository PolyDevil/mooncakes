import { component$, Slot } from "@builder.io/qwik";
import Header from "~/components/header";

import styles from "./layout.module.css";

export default component$(() => {
  return (
    <div class={styles.rootX}>
      <Header />
      <Slot />
    </div>
  );
});
