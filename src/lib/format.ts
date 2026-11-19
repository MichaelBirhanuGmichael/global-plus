/** "2026-09-19" -> "19 September 2026" (empty text stays empty). */
export function formatDate(iso: string): string {
  if (!iso) return "";
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${iso}T00:00:00`));
}
