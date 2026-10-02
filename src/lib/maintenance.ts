/**
 * Single switch for the maintenance screen.
 *
 * Production default is OFF unless NEXT_PUBLIC_MAINTENANCE_MODE is the
 * string "true". Local/dev is turned on via `.env.development` (and
 * `.env.local` on this machine) so `next dev` shows only maintenance.
 *
 * Access `process.env.NEXT_PUBLIC_MAINTENANCE_MODE` statically so Next.js
 * can inline the public value at build time.
 */
export function isMaintenanceMode(): boolean {
  return process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";
}
