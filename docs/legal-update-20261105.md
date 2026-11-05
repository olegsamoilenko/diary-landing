# Terms and Privacy update — 5 November 2026

## Contact and wording follow-up — 5 November 2026

The user supplied the provider name, email and phone and explicitly requested
removing the address from these documents. `getLegalContact(locale)` now supplies
the Ukrainian name for `uk` and the user-provided Latin spelling for `en`, `pl`
and `de`, with the same email/phone in both documents. The postal-address field
is not rendered. This supersedes the contact-placeholder publication dependency
below; it is not a determination that store disclosures satisfy every applicable
seller-information obligation. Existing branded support contact is unchanged.

The selective AI-retention paragraph now matches exactly between Terms and
Privacy in each of the four locales: selected AI conversations, no account link,
automatic deletion after 7 days. Detailed Privacy disclosures remain in place.
No production deployment was performed. HTTP recheck for this follow-up was
unavailable because the local site at port 3000 did not respond.

## Accepted wording and scope

The user requested complete Terms and Privacy updates in all site languages,
general AI wording without provider/model lists, selective AI-data retention
for seven days solely for correct app operation and improvement of model
analysis quality, and placeholders for trader contact details. The follow-up
explicitly clarified selective storage, not storage of every AI request.

Current texts cover community visibility, moderation and reports; subscriptions;
separately purchased credits; AdFree without an included AI allowance; local
journal/backup responsibility; deletion and statutory consumer/privacy rights.
Account inactivity follows the current code: warning at 150 days, deletion at
180 days, with an active paid subscription or any unused purchased-credit
balance protecting against automatic deletion. Voluntary deletion remains
available and removes the account's purchased-credit balance.

Quality samples have no attached account identity; text may nevertheless identify
someone. Temporary operational media can be account-linked. The policy keeps
this distinction and does not call all AI data anonymous or promise that all
external AI providers have identical internal retention rules.

## Implementation

- `messages/{en,uk,pl,de}.json`: complete `TermsPage.Document` and
  `PrivacyPage.Document`, plus shared `Legal` labels. All other existing
  translations and metadata were preserved.
- `components/static/LegalDocument.tsx`: one server-rendered document component
  using the existing Container, Title, Text and UnorderedList. Each document has
  12 translated sections, semantic headings, document language, localized
  navigation and working external policy links. No HTML from translations is
  injected.
- `lib/legal/contact.ts`: one place to fill `[LEGAL_NAME]`, `[POSTAL_ADDRESS]`,
  `[CONTACT_EMAIL]`, `[CONTACT_PHONE]` for all documents/locales. Existing
  `nemoryai.diary@gmail.com` remains a working support link. Update date:
  2026-11-05.
- Localized and unprefixed `terms/page.tsx` and `privacy/page.tsx` use the same
  content source. Existing metadata and locale middleware remain in place.
- Removed obsolete `PrivacyAdvertisingSection.tsx`; its disclosures were
  integrated and translated in each Privacy document, preserving the
  `advertising-and-consent` anchor.

## References checked

- Current page consumers, `lib/i18n/routing.ts`, `proxy.ts`, static typography.
- Backend credit wallet, subscription catalog (AdFree allowance is zero),
  inactivity cron, user deletion and forum author `SET NULL` relations.
- Frontend account-deletion flow; earlier image-retention handoff
  `diary-back/docs/image-generation-retention-20261105.md`.
- Current Google Play requirements:
  [Privacy policy and user data](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en),
  [Trader declaration](https://support.google.com/googleplay/android-developer/answer/17594752).
- [GDPR, including information and data-subject rights](https://eur-lex.europa.eu/legal-content/EN-GA/TXT/?uri=CELEX%3A32016R0679).

## Validation

- TypeScript: `tsc --noEmit --incremental false` passed.
- Scoped ESLint and Prettier passed for changed pages/component/contact config.
- Scoped `git diff --check` passed.
- Real local Next.js HTTP rendering passed for all eight locale/document
  combinations. Checked every translated paragraph and list item in the rendered
  article, all 12 section headings, document language, date, four contact
  placeholders, localized navigation and canonical URL.
- `/terms` and `/privacy` redirect to the current English documents with an
  English language request, as configured by existing middleware.
- Parsed locale data was compared with HEAD: unrelated messages were unchanged.
- Used the existing local server on port 3000. Did not stop or restart it.
  No production build, deployment, or visual browser/device inspection claimed.

## Publication dependencies and known implementation limits

- Fill the four real trader/contact values before publishing. This is a local
  draft update, not a claim of completed legal review or store approval.
- Deploy the separately completed backend purchased-credit inactivity protection
  and generated-image payload cleanup before publishing claims about them.
- Seven days is the user's chosen AI-content policy. Generated-image cleanup
  runs hourly; quality-sample cleanup is scheduled, so downtime can delay it.
  Input media still uses the existing durable-local-replay acknowledgement gate;
  legacy/unacknowledged input media can outlive seven days. That remaining
  operational gap was not silently changed in this legal-text task. Address it
  safely before treating the policy as fully enforced for all temporary media.
- The existing 30-day technical-log and server-backup statements were retained,
  separately from the requested seven-day AI-content period. Infrastructure
  configuration and external provider retention were not re-audited here.
- Forum content currently survives account deletion with its author relation
  cleared. Text is not thereby guaranteed anonymous; documents disclose this
  and give removal/support options.

Next step: fill contact details and complete the backend/publication dependencies.
No unrelated admin, app, AI prompt or billing implementation was changed here.

Usage ledger: exact fresh-input, cached-input and output/reasoning token counts
were not exposed. No API-equivalent cost or account-quota change was calculated.
