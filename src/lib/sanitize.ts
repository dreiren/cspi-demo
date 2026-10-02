/**
 * Defensive string cleanup for contact fields. Applied before validation
 * so HTML/script markup cannot sit in mailto bodies or webhook JSON.
 * React already treats field errors as text; this is defense in depth.
 */

const VOID_OR_BLOCK_NAMES = "script|style|iframe|object|embed|link|meta|base|svg|math|form|textarea";

function replaceMarkup(value: string): string {
  return value
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(new RegExp(`<\\s*(${VOID_OR_BLOCK_NAMES})\\b[^>]*>[\\s\\S]*?<\\s*/\\s*\\1\\s*>`, "gi"), " ")
    .replace(new RegExp(`<\\s*(${VOID_OR_BLOCK_NAMES})\\b[^>]*>`, "gi"), " ")
    .replace(/<\/?[a-zA-Z][^>]*>/g, " ");
}

/** Remove HTML/script tags. Leftover angle brackets are dropped so markup cannot reassemble. */
export function stripHtmlTags(value: string): string {
  let text = value;
  for (let pass = 0; pass < 8; pass += 1) {
    const next = replaceMarkup(text);
    if (next === text) break;
    text = next;
  }
  return text.replace(/[<>]/g, "");
}

/** Drop C0/C1 controls except tab/LF/CR so submitted copy stays printable text. */
export function stripControlChars(value: string): string {
  let result = "";
  for (const char of value) {
    const code = char.charCodeAt(0);
    const allowWhitespace = code === 9 || code === 10 || code === 13;
    if (!allowWhitespace && (code < 32 || (code >= 127 && code <= 159))) continue;
    result += char;
  }
  return result;
}

export function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export function sanitizeSingleLine(value: unknown): string {
  return stripHtmlTags(stripControlChars(asString(value)))
    .replace(/\s+/g, " ")
    .trim();
}

export function sanitizeMultiline(value: unknown): string {
  return stripHtmlTags(stripControlChars(asString(value).replace(/\r\n/g, "\n")))
    .replace(/[ \t]+/g, " ")
    .replace(/ \n/g, "\n")
    .replace(/\n /g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
