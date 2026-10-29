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
compatible. Refresh has loading, abort and retry states. Growth charts below the
cards have their own date filters and loading state (see 28 October update).

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

Next: activity and observations remain empty.
Exact fresh/cached input and output token usage was unavailable;
no cost or quota estimate is asserted.

## User growth charts — 28 October 2026

Two charts below the overview: registrations and first recorded paid subscription.
Both share inclusive from/to dates and day/week/month/quarter/year grouping.
Default range is one calendar month back through today in Kyiv; month-end dates
are clamped (31 March starts on 28/29 February). Default grouping is day. Weeks
start Monday, quarters start January/April/July/October; edge buckets include only
the selected dates. Empty buckets are zero-filled.

UserGrowthCharts reuses DatePicker, Select, Button and SimpleBarChart. The latter
now has a V2 variant with semantic colors, subtle gradients, rounded bars, lighter
grid, integer axes and a tooltip showing the exact included dates. Each chart
card displays the period total, description and applied range. V1 appearance is
unchanged. Requests support cancellation, loading, inline validation and retry.

Admin-JWT GET /users/admin-growth aggregates in PostgreSQL, without hydrating
user histories. Registrations respect the existing naive-UTC createdAt column.
Paid users are deduplicated by user across store_subscriptions and legacy plans,
using the earliest startTime with a recorded successful lastOrderId, BEFORE
applying the date range. Both AdFree plans, Lite, Base and Pro come from the shared
paid-plan catalog. Renewals, upgrades and migrated duplicates count once;
expired/canceled subscriptions remain in historical acquisition counts. Current
subscription state, purchased-credit-only accounts, trial and testing are not
used as evidence of a new paid subscription. Deleted users are excluded, as in
the overview's database population. Rows lacking a successful order/date cannot
establish acquisition, and missing/deleted historical records cannot be recovered
by these charts. This is subscription acquisition, not a revenue/payment ledger.
No schema change, production deployment or billing-flow change is required.

The query bounds output to approximately 2,000 buckets; larger ranges require
coarser grouping. Optional real PostgreSQL tests use only read-only CTE fixtures:
set ADMIN_GROWTH_POSTGRES_CONTAINER=nemory-postgres and run
src/users/admin-user-growth.spec.ts. They cover Kyiv midnight/DST, AdFree,
historical deduplication before filtering, partial periods and zero buckets.

Verification this turn: both repository TypeScript checks and landing scoped ESLint passed; four default
range cases passed (month end, leap year, Kyiv midnight, year boundary). Eleven
backend contract cases passed. Docker PostgreSQL execution timed out, so the same
CTE fixtures and actual production query were run successfully in isolated
PostgreSQL WASM (PGlite, temporary tooling only, no app dependency change). All
five granularities, totals, deduplication, DST and empty buckets passed there.
Live browser verification is pending: the existing webview could not attach and
local ports 3000/3001 were not listening. This is code/SQL verification, not visual
acceptance or production deployment. Exact token usage is unavailable.
Initial concurrent checks exhausted host memory; sequential backend TypeScript
completed with a 3 GiB heap limit.
Backend scoped ESLint found only generic-type formatting issues, corrected with
Prettier and checked again for formatting; no other lint diagnostics remained.

### Paid-plan breakdown — 28 October follow-up

User requested all paid plans on ONE paid-users chart, not separate charts.
That chart now stacks five colored series: monthly AdFree, annual AdFree, Lite,
Base and Pro. The legend includes a period total per plan; the tooltip includes
all five counts plus the overall total. Registrations remain a separate chart.
SimpleBarChart's optional series/values support reuses the V2 rendering; shared
semantic chart colors live in globals-admin.css. Dates and grouping are unchanged.

The API adds paidByPlan to each point (all catalog plans, including zero values)
and preserves newPaidUsers/totals for compatibility. It selects the earliest
recorded subscription with its basePlanId BEFORE date filtering, so an upgrade
does not create an additional new user or move the user into the upgraded tier.
For equal timestamps, store data wins over a legacy duplicate, with basePlanId
as a deterministic final tie-breaker. Attribution remains limited by retained
subscription history; it does not reconstruct overwritten historical plans.
SQL fixtures now exercise all five tiers, migration duplicates and a later
Base-to-Pro upgrade; per-plan sums must equal the overall paid-user count for
every grouping. Tests passed in isolated PostgreSQL WASM; 11 contract cases and
both repository TypeScript checks and scoped frontend lint passed. Live UI
remains unverified (ports 3000/3001 inactive).

### Empty paid chart follow-up — 28 October

User screenshot showed a nonzero total but zero plan legend entries. Current SQL
and service were checked against the local database in a read-only transaction;
the breakdown and total agree. A fresh authenticated IAB tab showed matching
legend totals and two visible bars. The old tab's exact retained payload was not
captured; stale pre-breakdown React state after Fast Refresh is the likely cause,
not a proven SQL error. No billing data or backend containers were changed.

UserGrowthCharts now validates both incoming responses AND retained render state
via lib/utils/adminGrowth.ts: integer/nonnegative series counts, per-date sums
across known plans, and period totals must agree. Inconsistent/old data shows an
explicit retry state instead of a nonzero headline with zero bars. Card totals
are labeled "Усього за період", with "усі плани" on the paid card.
Ten regression cases in tests/admin-growth.test.mjs pass (`node --test`), including
missing breakdown, zero-filled mismatch, incorrect total and malformed counts.
The actual UI is now visually verified in authenticated IAB; screenshot saved at
.tmp/paid-growth-fixed.png. This supersedes earlier pending visual verification.

Environment correction: empty sandbox netstat output did not establish that the
user's dev servers were stopped. Host checks with elevated access found live
3000/3001/5432. Native and Docker backend listeners both existed; this is not
established as the cause of this chart symptom. Do not stop either speculatively.

## Finance V2 — 2026-10-28

Implemented `/admin-v2/finance` with the existing AdminPageHeader, StatisticBlock,
SimpleBarChart and shared V2 controls. AdminPeriodFilter is reused by Finance and
UserGrowthCharts. Kyiv from/to defaults to last 30 inclusive days, daily grouping;
day/week/month/quarter/year, test-payment toggle, eight plan/credit summaries,
stacked counts and gross USD charts. Existing growth and V1 behavior preserved.

Backend admin-jwt endpoint `/finance-statistics/admin-revenue` combines credit
purchases, existing payments and retained Google subscription orders, deduplicates
orders and separates renewals. Historical payment-day FX uses existing service,
with official NBU rates when OXR is not configured. Missing gross/currency/rates,
unknown products, provisional dates and catalogue estimates are disclosed.
Revenue estimates are labeled separately; aggregate net requires full coverage.

Latest decision restores actual `developerRevenue` and adds `taxAmount` to credit
purchases and subscription payments. New subscription orders are transactionally
registered in existing payments and filled asynchronously from Google Orders;
credit financial retries preserve grants and historical manual data. See
`../diary-back/docs/credit-purchase-finance.md` for migrations, fallback policy,
fee uncertainty, lifecycle and deployment scope. Unknown tax is not zero;
unconfirmed credit fee is not assumed. All available local orders were tests,
so the user's proposed 15% credit fee could not be inferred from transactions.

Validation: both repo TypeScript checks, scoped ESLint and diff checks passed.
Core finance/credit suite 57 tests, subscriptions/IAP/payment/FX regression suite
86 tests, final finance/terminal-state suite 36 tests (overlapping suites; do not
sum). The first terminal-state invocation used a misspelled file path; the correct
suite then passed. Ten frontend growth contract tests passed. Isolated PostgreSQL
confirmed additive/idempotent migrations, manual amount preservation, per-order
idempotency, separate renewals, precision and safe refusal of rollback with unknown
amounts. Read-only actual local report matched in all five grouping modes.
Authenticated IAB verified day/month chart data and test toggle zero/nonzero;
screenshots `.tmp/finance-final.png` and `.tmp/finance-chart-final.png`.

Backend automatic reload can take time. Final HTTP proxy and authenticated report
worked. Separate localhost IPv6 Docker/WSL listener had socket failures, but Next
actually rewrites to the working LAN address, so it was not established as this
page's error cause. No runtime/process/environment changes were made. Prior
Next dev issue badge contains previous request errors, not a newly observed final
render failure. No production deployment, real purchase or account programme
verification was performed.

Usage ledger: exact fresh/cached input and output counts unavailable; no cost or
account quota estimate asserted.
