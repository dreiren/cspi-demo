/**
 * Safe extra attributes for outbound anchors. Hash/internal links stay in-page.
 * javascript:/data: URLs are rejected so content mistakes cannot become XSS.
 */

export function isHttpUrl(href: string): boolean {
  try {
    const url = new URL(href);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function isInPageHref(href: string): boolean {
  return href.startsWith("#") || href.startsWith("/");
}

export type SafeAnchorProps = {
  href: string;
  target?: "_blank";
  rel?: "noopener noreferrer";
};

export function safeAnchorProps(href: string): SafeAnchorProps {
  if (isInPageHref(href)) {
    return { href };
  }
  if (isHttpUrl(href)) {
    return { href, target: "_blank", rel: "noopener noreferrer" };
  }
  return { href: "#" };
}
