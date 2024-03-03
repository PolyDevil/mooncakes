import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import c from "clsx";
import withTypography from "~/base/typography";
import withLiton from "~/base/liton";
import { router } from "~/routes/o/[org]/[package]/plugin@route";
import { query } from "~/routes/search/plugin@route";

import { type t } from "..";
import styles from "./style.module.css";

interface props {
  class?: string;
  data: t;
}

const liton = withLiton({
  tag: {
    size: "extraSmall",
  },
});

const typography = withTypography({
  title: "subtitle2",
  version: [styles.versionX, "caption1Strong"],
  author: [styles.authorX, "body1"],
  description: [styles.descriptionX, "body2"],
  keywords: [styles.keywordsX, "caption1Stronger"],
});

export default component$<props>((props) => {
  return (
    <article class={c(styles.rootX, props.class)}>
      <h4 class={typography.title}>
        <Link
          href={router({
            org: props.data.author,
            package: props.data.name,
          })}
          title="name"
        >
          {props.data.name}
        </Link>
      </h4>

      <section class={typography.version} title="version">
        <h5>version</h5>
        <data value={props.data.version}>{props.data.version}</data>
      </section>

      <section class={typography.author} title="author">
        <h5>author</h5>
        <data value={props.data.author}>{props.data.author}</data>
      </section>

      <p class={typography.description}>{props.data.description}</p>

      <ul class={typography.keywords}>
        {props.data.keywords.map((keyword) => (
          <li key={keyword}>
            <Link
              href={query({
                keywords: keyword,
              })}
              class={liton.tag}
            >
              {keyword}
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
});
