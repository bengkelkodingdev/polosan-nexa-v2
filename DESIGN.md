# Nexa Design System — Short Version

> Condensed from `DESIGN.md` (full reference, ~1,000 lines). Baseline: `fe-nexa-v2` branch `staging` (`ce657a9`), audited 2026-11-23.
> Describes what is **implemented**, not a redesign. Suggestions are marked **[R]**.

## 1. At a glance

- Dense, data-first admin dashboard for 5 roles: Superadmin, Admin, Manager, Auditor, Executive.
- **Stack:** Next.js 16 (App Router), React 19, Tailwind v4 (CSS-first, no config file), shadcn/ui `new-york`, Radix, lucide-react, recharts, Leaflet, sonner.
- **Look:** gray-blue canvas `#f0f2f8`, white cards, navy sidebar `#222845`, blue action color `#2563eb`, small type (11–13px).
- **Key fact:** tokens exist in `src/app/globals.css`, but components mostly hard-code hex values (3,032 hex literals vs 63 token-class uses). **The real system is the hex palette below.**
- Dark mode: `.dark` tokens are declared but not used outside `components/ui`, so dark mode is not supported.

## 2. Three shells

| Shell | Where | Structure |
|---|---|---|
| App (5 role layouts, identical) | `src/app/(authenticated)/<role>/layout.tsx` | Sidebar + sticky white header `h-14` + scrolling `<main class="p-7">` |
| Tenant dashboard | `/dashboard/*` | Top `DashboardNavbar` + `max-w-7xl px-4 md:px-8` content + footer |
| Landing | `/` | Own navbar/footer, marketing sections |

Page anatomy (app): `h1` → optional `PageTabs` → KPI cards → `DataTable`.

## 3. Color

**Brand and neutrals (effective)**

| Role | Value |
|---|---|
| Action blue / hover / pressed | `#2563eb` / `#1d4ed8` / `#1e40af` |
| Text strong | `#111827` (also `#1a1f36`, a duplicate) |
| Text body | `#4b5675` |
| Text muted | `#9aa3bf` ⚠ fails contrast (2.2–2.5:1) |
| Canvas / subtle surface | `#f0f2f8` / `#f8f9fc` |
| Border / input border | `#e4e8f0` / `#d0d6e8` |
| Row divider | `#f1f3f9` |
| Sidebar bg / hover | `#222845` / `#2e3660` |
| Accent orange | `#f97316` |

**Status = tinted background + same-hue text**

| Meaning | Text | Background |
|---|---|---|
| Success | `#16a34a` | `#f0fdf4` |
| Danger | `#dc2626` | `#fef2f2` |
| Info | `#2563eb` | `#eff6ff` |
| Warning | `#d97706` | `#fffbeb` |
| Orange | `#f97316` | `#fff7ed` |
| Purple | `#7c3aed` | `#f5f3ff` |
| Cyan (KPI) | `#06b6d4` | `#cffafe` |

⚠ Map markers use other values for the same statuses (`MISSED #f59e0b`, `INACTIVE #94a3b8`) than table pills (`#d97706`, `#6b7280`).

**Declared tokens:** `--primary` is shadcn near-black, **not** the brand blue. `--radius: 0.625rem` (10px). `--chart-1…5` are unused.

## 4. Typography

- **Fonts:** Plus Jakarta Sans 300–800 (UI), JetBrains Mono 400–600 (numbers in charts/stats). Loaded via `next/font` in `src/app/layout.tsx`.
- **No type scale** — 26 arbitrary pixel sizes. The common ones:

| Use | Style |
|---|---|
| Page title | `text-2xl font-bold #111827` |
| KPI value | `24px extrabold tracking-[-1px]` (30px on `ActionKpiCard`/`MrrCard`) |
| KPI label | `11.5px semibold uppercase #9aa3bf` |
| Table header | `10.5px bold uppercase tracking-[0.6px] #9aa3bf` |
| Table cell | `12.5px #4b5675` |
| Body / nav / tabs | `13px` |
| Form label | `12px bold #4b5675` |
| Badge / pill | `10.5–11px bold` |
| Modal title | `16px bold` |

## 5. Spacing, radius, shadow

- Tailwind 4px scale, including fractional steps (`py-2.75` = 11px, `px-4.5` = 18px). No spacing tokens.
- **Control heights:** 28 / 32 / 34 / 36px (`h-7`, `h-8`, `h-8.5`, `h-9`).
- **Radius:** controls 6–7px, cards/table 10px, shadcn card 14px, modal 14px, toast/dropdown 18px, pills full.
- **Shadow:** card `0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04)`; hover `0 4px 12px rgba(0,0,0,.10)`; popover `0 4px 16px rgba(0,0,0,.08)`; modal `0 12px 40px rgba(0,0,0,.12)`.
- **z-index:** no scale; header/overlays `z-50`, map overlays `z-400…z-1003`.

## 6. Core components

| Component | File | Notes |
|---|---|---|
| `DataTable` | `components/common/data-table/` | Tabs → toolbar (search 275px + filters + right slot) → table → pagination. Skeleton loading, empty "Tidak ada data ditemukan". Filters hidden below `lg`. |
| `Pagination` | same | Page window ±2, per-page `[5, 20, 50, 100]`, default 20 |
| `KpiCard` | `common/cards/kpi-card.tsx` | 7 variants; 40px tinted icon box. Top 3px accent bar is **deprecated** (still rendered in code until removed) |
| `ActionKpiCard`, `MrrCard` | `common/cards/` | Larger 30px value |
| `ActionButton` | `common/inputs/action-button.tsx` | `blue/green/red/subtle/outline-*`, sizes `sm/md/lg/icon` — the de-facto brand button |
| `ui/button` | shadcn | Default variant is near-black (not brand) |
| `PageTabs` | `common/page-tabs/` | 2px underline tabs, active blue |
| `ConfirmDeleteModal` | `common/modals/delete-modal.tsx` | 380px, red icon circle |
| `fleetToast` | `common/modals/toast.tsx` | success/error/info/loading + CRUD helpers, progress bar |
| `BarChartCard`, `DonutChartCard` | `common/charts/` | Dark tooltip `#1a1f36` |
| `StatusPill` | `features/.../fleet-operation-status-pill.tsx` | Only reusable pill; feature-scoped |
| `MapView` | `common/map-view/` | Leaflet, OSM / Carto Light tiles |

**Sidebar:** 16rem / 4rem collapsed / 18rem mobile sheet. Active item = blue gradient `#2563eb → #3b82f6` + glow. Shortcut `b`.

## 7. Responsive

- Tailwind defaults: `sm 640`, `md 768`, `lg 1024`. `xl`/`2xl` unused.
- Sidebar becomes a sheet below **768px**; content layouts switch at **1024px** (two different "mobile" definitions).
- Page padding stays `p-7` on mobile.

## 8. States

| State | Pattern |
|---|---|
| Hover | neutral bg `#f5f7fb`/`#f8f9fc`; interactive border/text → `#2563eb` |
| Focus | shadcn ring `ring-[3px] ring-ring/50`; branded inputs: ring removed, border → blue |
| Selected | row `#eff6ff`; nav = blue gradient |
| Disabled | `opacity-50` (pagination `40`) |
| Loading | skeleton rows; `Loader2` spinner |
| Motion | 150ms hover, 200ms chevrons/cards; no reduced-motion handling |

## 9. Main issues (from the audit)

1. Hard-coded hex everywhere instead of tokens; `--primary` doesn't match the brand.
2. Two button systems plus raw `<button>`s; three tab styles; duplicated user dropdowns, activity logs, map config.
3. 26 font sizes, 10 radii, 14 z-index values, 6+ near-identical shadows — no scales.
4. Contrast: muted `#9aa3bf` text and green/amber/orange pills fail WCAG AA; `#6b7280` also fails on the canvas (4.32:1).
5. A11y: icon buttons have `title` but no `aria-label`; custom header dropdown has no keyboard support; clickable rows are not keyboard-operable; `lang="en"` on an Indonesian UI; no `aria-current` in the nav.
6. Mixed Indonesian/English copy; brand name split between "Nexa" and "FleetTrack".
7. `animate-fade-in` is used but never defined.

## 10. Rules for new work **[R]**

- Reuse `components/common` (DataTable, KpiCard, ActionButton, PageTabs) before writing new UI.
- Use the palette in §3; don't add new hex values.
- Status = tint + text + label, never color alone.
- No colored top stroke on cards; use the tinted icon box for color.
- Don't remove focus outlines without a replacement; give icon-only buttons an `aria-label`.
- Write UI copy in Indonesian.
- Lucide icons at `size-4`.
