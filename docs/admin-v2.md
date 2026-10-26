# Admin V2 — 22 October 2026

User decision: rebuild the admin gradually around current product data and
modern design. Keep V1 available until its retirement is explicitly requested.

- `/admin-v2` is its own Dashboard, not a redirect.
- The sidebar has a separate Dashboard and a **Користувачі** section:
  - `/admin-v2/new-users` — Нові користувачі.
  - `/admin-v2/users-activity` — Активність користувачів.
  - `/admin-v2/users-statistics` — Статистика користувачів.
  - `/admin-v2/observations` — Спостереження.
- Dashboard, activity and observations remain placeholders. User statistics is
  first in the Users block, followed by New users, Activity and Observations.
  New users has live registration statistics and a paginated accordion table.
- Both versions share `AdminShell`, `SidebarNav`, the existing Button and
  `admin_session` verification in `proxy.ts`. The version switch navigates to
  each version's dashboard. The current version is filled; the other is ghost.
- V2 styling is scoped through `.admin-v2` tokens in `app/globals-admin.css`.
  Its initial light shell uses the existing Nemory logo, navigation icons,
  a sidebar profile and responsive content spacing. This is an initial design
  implementation; user visual acceptance is pending.
- The sidebar mark is copied unchanged from the active mobile brand asset
  `diary-front/assets/images/logo/nemory-concept-b-v2.svg` to
  `public/assets/nemory-mark-v2.svg` (user correction, 22 October).

Validation: TypeScript and scoped lint passed; 16 middleware authorization
cases covered V1/V2, anonymous/inactive/wrong-type and active-admin sessions.
SSR verified version selection, active page links and empty pages. Browser DOM
confirmed V1's selected switch has a filled background and the other is
transparent. The browser had no admin session for V2, so its authenticated
visual appearance was not inspected. No deployment was performed.
After adding the users section, TypeScript, scoped lint and diff checks passed.
SSR verified all five empty pages, one users heading, one active navigation link
per route and the preserved V1 menu. Authenticated visual review remains pending.

Earlier activity-page fixes remain in this worktree: `compact: true` requests
return relation counts; legacy arrays load with `relationLoadStrategy: query`
to avoid the five-collection Cartesian join implicated in the reported 4 GB
heap exhaustion. Date filters now group the without-plan alternatives.
Errors are displayed and Show is disabled during loading. Six backend tests,
both repository typechecks, scoped lint and mocked UI/API checks passed.
The production crash/recovery was not re-tested. The export-error report was
followed by successful dev-server rebuilds after explicit function exports and
type-only imports; no server restart or cache deletion was performed.

## New users implementation

- Default period: last 10 calendar days including today, Europe/Kyiv, both
  endpoints inclusive. Date selection and any positive integer page size apply
  with Show; default size is 200. The graph covers the entire registration
  cohort independently of the current table page.
- Recharts V2 composition: total line and stacked with/without-action bars.
  An action is any received entry, check-in, either dialog, legacy goal or actual
  planner creation report, including actions after the selected registration period.
- Admin-JWT endpoints: `/users/admin-new-users`, `/users/admin-new-users/days`,
  `/users/admin-details/:id`. Lists use scalar counts, not activity/payment joins.
  Planner counts aggregate only page IDs. Details and independently paginated
  logs load on expansion. Secrets and purchase tokens are excluded from JSON.
- The fixed-width acquisition column wraps/clamps long values with a full title.
  Three creation columns: entries/dialogs/check-ins; goals/events/tasks/reminders;
  habits/checklists/notes. Purchased credits are JSON-only, from shared
  `CreditWalletService.getSummary`, with total/used/remaining/debt/revoked.
- Entry/check-in counts always show **with analysis / without analysis / unknown**.
  JSON keys are `entriesAnalysis` and `checkinsAnalysis`, each with
  `withAnalysis`, `withoutAnalysis`, `unknown`. Counts use explicit boolean/null
  evidence, never token usage. Totals remain available separately.
- Check-ins now mirror the existing entry analysis flag. Mobile creation reports
  false; a successfully persisted complete analysis promotes that same trace to
  true. Replays cannot downgrade it or create another counted creation. Historical
  and old-client rows stay null. Backend migration:
  `1792670400000-AddCheckinStatAnalysis`; deploy backend/schema before mobile.
- Log filter label/control wrappers share the DatePicker flex-column gap,
  fixing the raised level selector. Existing shared controls are reused.

Authenticated browser verification: table pagination with size 2; graph stays
independent; restored size 200; live triple counts, expanded JSON wallet and logs;
all five log controls have equal top position and 36px height. Log page 2 works
independently of table page 1 (restored both to page 1). Backend 41 focused tests,
mobile 94 focused tests, all three TypeScript checks and scoped lint passed.
Production deployment and native device acceptance are separate, pending checks.

## User statistics — 22 October 2026

`/admin-v2/users-statistics` uses the shared StatisticBlock with a V2 variant,
AdminPageHeader, Button, V2 semantic colors and apiFetch. V1 StatisticBlock stays
compatible. No graph or filters yet. Refresh has loading, abort and retry states.

Admin-JWT `GET /users/admin-overview` returns one aggregate over the full user
table, with no activity/history hydration or per-user service calls:
- Total includes every user currently present in the database.
- Trial means current Start access: period started, not expired, credits not
  exhausted, not disabled or opted out. Testing is not the initial trial.
- Paid tiers come from the shared catalog: Lite, monthly AdFree, annual AdFree,
  Base and Pro, including zero counts. Current paid-period billing rules include
  ACTIVE, IN_GRACE and CANCELED until expiry; exhausted AI credits and AdFree's
  zero AI allowance do not remove a paid subscription. Paused, held, refunded,
  pending, expired and future periods do not count.
  User-requested display order: monthly AdFree, annual AdFree, Lite, Base, Pro.
- V2 state is authoritative even if it represents no plan. Only users with no
  V2 state fall back to the latest actual legacy plan (expiry descending, then
  ID, null expiry last). Single-row joins avoid duplicate users. Legacy paid
  statuses are derived through SubscriptionLegacyMapper and the shared
  canStoreSubscriptionGrantAccess rule.
- Purchased credits means users with wallet balance > 0, not lifetime purchasers.
  This overlaps with subscriptions and trial; these counts must not be summed.
- Active means lastActiveAt falls within 30 Kyiv calendar days including today,
  up to the calculation instant, and its Kyiv day differs from the registration
  day. Uses the actual schema: createdAt is naive UTC, lastActiveAt is timestamptz.
  Null/future activity and users active only on their registration day are excluded.

Authenticated browser confirmed the menu order, live cards and separate monthly/
annual AdFree. PostgreSQL read-only CTE fixture (24 synthetic users) confirmed
DST/midnight/30-day boundaries, legacy/V2 precedence, multiple actual plans,
expired/cancelled/grace/exhausted paid plans, trial and wallet balance semantics.
No production deployment or schema migration was required/performed.
Validation: 12 overview tests and 16 existing new-user tests passed; both
repository TypeScript checks and scoped lint passed. A later presentation-only
change moves both AdFree cards before Lite, confirmed in the authenticated DOM.

Next: graphs will be added when requested; activity and observations remain empty.
Exact fresh/cached input and output token usage was unavailable;
no cost or quota estimate is asserted.
