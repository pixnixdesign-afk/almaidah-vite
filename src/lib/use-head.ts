import { useEffect } from "react";

type MetaTag = { title?: string; name?: string; property?: string; content?: string; charSet?: string };
type LinkTag = { rel: string; href: string };
type ScriptTag = { type: string; children: string };
export type HeadConfig = { meta?: MetaTag[]; links?: LinkTag[]; scripts?: ScriptTag[] };

/**
 * Lightweight per-page <head> manager (title, meta tags, canonical link).
 * Replaces TanStack Router's route-level `head()` option. Restores the
 * previous values when the page unmounts.
 */
export function useHead(head: HeadConfig) {
  useEffect(() => {
    const undo: Array<() => void> = [];

    for (const tag of head.meta ?? []) {
      if (tag.title) {
        const prev = document.title;
        document.title = tag.title;
        undo.push(() => {
          document.title = prev;
        });
        continue;
      }
      const attr = tag.name ? "name" : tag.property ? "property" : null;
      const key = tag.name ?? tag.property;
      if (!attr || !key || tag.content === undefined) continue;

      let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (el) {
        const prev = el.content;
        el.content = tag.content;
        undo.push(() => {
          el!.content = prev;
        });
      } else {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        el.content = tag.content;
        document.head.appendChild(el);
        const created = el;
        undo.push(() => created.remove());
      }
    }

    for (const link of head.links ?? []) {
      const el = document.createElement("link");
      el.rel = link.rel;
      el.href = link.href.startsWith("/") ? window.location.origin + link.href : link.href;
      document.head.appendChild(el);
      undo.push(() => el.remove());
    }

    for (const script of head.scripts ?? []) {
      const el = document.createElement("script");
      el.type = script.type;
      el.text = script.children;
      document.head.appendChild(el);
      undo.push(() => el.remove());
    }

    return () => undo.reverse().forEach((fn) => fn());
  }, [head]);
}
