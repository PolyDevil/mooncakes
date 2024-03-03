/*
  https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
*/

export type level = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

interface ListItem {
  position: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
  name: string;
  back: string;
  item: string;
}

export namespace Segment {
  export interface i {
    uri: string;
    name: string;
    back: string;
  }

  export type t = Readonly<i>;

  export function create(input: i): t {
    return Object.freeze(input);
  }

  export function createRoot(input: i) {
    return Object.freeze([create(input)]) as Readonly<[t, ...Array<t>]>;
  }

  export function push(list: Readonly<Array<t>>, ...items: Array<t>) {
    // eslint-disable-next-line no-var
    var r = Array.from(list);

    // eslint-disable-next-line no-var
    for (var el of items) {
      r.push(el);
    }

    return Object.freeze(r) as Readonly<[t, t, ...Array<t>]>;
  }

  export type list = Readonly<
    [Readonly<ListItem>, Readonly<ListItem>, ...Array<Readonly<ListItem>>]
  >;

  export function toBreadcrumbList(list: Readonly<[t, ...Array<t>]>) {
    // eslint-disable-next-line no-var
    var l = [],
      path = "";

    // eslint-disable-next-line no-var
    for (var i = 0; i < list.length; i++) {
      path += list[i].uri + "/";

      l.push(
        Object.freeze({
          position: String(i + 1),
          name: list[i].name,
          back: list[i].back,
          item: path,
        } as ListItem)
      );
    }

    return Object.freeze(l) as list;
  }

  export function get(list: list, level: level) {
    // eslint-disable-next-line no-var
    for (var i = 0, lookup = String(level); i < list.length; i++) {
      if (list[i].position == lookup) {
        return list[i];
      }
    }

    return;
  }

  export function uri(list: list, level?: level) {
    if (typeof level === "undefined") {
      return list.at(-1)?.item;
    }

    // eslint-disable-next-line no-var
    var element = get(list, level);
    if (element) return element.item;
    return "";
  }
}
