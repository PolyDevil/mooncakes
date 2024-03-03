import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import c from "clsx";
import withTypography from "~/base/typography";

import { type props as parentProps } from "..";
import Card from "./card";
import styles from "./style.module.css";

export { type t } from "..";

export interface props {
  class?: string;
  data: parentProps["data"];
}

const typography = withTypography({
  title: "title1",
  letter: [styles.letterX, "title2"],
});

export default component$<props>((props) => {
  return (
    <section class={c(styles.rootX, props.class)}>
      <h2 class={typography.title}>All Mooncakes</h2>

      <ol>
        {props.data.map(([letter, values]) => (
          <li key={letter}>
            <h3 class={typography.letter} id={letter}>
              <Link href={`#${letter}`}>{letter}</Link>
            </h3>

            <ul class={styles.nestedX}>
              {values.map((v) => (
                <li key={v.name}>
                  <Card data={v} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
});
