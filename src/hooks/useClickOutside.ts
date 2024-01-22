import { MutableRefObject, useEffect, useRef } from "react";

const DEFAULT_EVENTS = ["mousedown", "touchstart"];

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: () => void,
  events?: string[] | null,
  nodes?: (HTMLElement | null)[]
): MutableRefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const listener: EventListener = (event) => {
      const target = event.target as Node;

      if (target instanceof Element) {
        if (Array.isArray(nodes)) {
          const shouldIgnore =
            target.hasAttribute("data-ignore-outside-clicks") ||
            (!document.body.contains(target) && target.nodeName !== "HTML");
          const shouldTrigger = nodes.every((node) => !!node && !node.contains(target));

          shouldTrigger && !shouldIgnore && handler();
        } else if (ref.current && !ref.current.contains(target)) {
          handler();
        }
      }
    };

    (events || DEFAULT_EVENTS).forEach((fn) => document.addEventListener(fn, listener));

    return () => {
      (events || DEFAULT_EVENTS).forEach((fn) => document.removeEventListener(fn, listener));
    };
  }, [ref, handler, nodes, events]);

  return ref;
}
