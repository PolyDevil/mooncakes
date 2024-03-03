import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import withTypography from "~/base/typography";
import { base } from "~/routes/plugin@route";

import styles from "./styles.module.css";

const typography = withTypography({
  logo: "title2",
});

export default component$(() => {
  return (
    <header class={styles.rootX}>
      <Link href={base} class={typography.logo}>
        🥮 mooncakes.io
      </Link>

      <search hidden>
        <form>
          <label>
            <span>Search</span>
            <input type="search" />
          </label>

          <button>Search</button>
        </form>
      </search>
    </header>
  );
});
