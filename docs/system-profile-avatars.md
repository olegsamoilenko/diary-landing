# System profile avatars — 26 October 2026

The live V1 route `/admin/community` renders `CommunityClient`. Its existing
CreateSystemUserDialog and shared Dialog/Button/Input controls are the reference.
V2 does not yet have a Community section; use V1 for this operation.

## Change the Nemory avatar

1. Deploy the backend and landing changes together, then open **Community → Системні профілі**.
2. On Nemory choose **Поточний логотип Nemory**, or select PNG/JPEG/WebP up to 2 MiB.
3. Review the preview and click **Зберегти аватар**. Selecting a file alone does not save it.

Admin and Moderator have the same file upload and preview. The Nemory preset is
an unchanged copy of the live mobile `assets/images/app-icon-v2.png`, stored in
`public/assets/nemory-avatar.png`. No mobile rebuild or database migration is needed.
Existing clients obtain the new URL when they refresh the public profile/topic data.

## Backend and persistence

- `PATCH /forum/profiles/system/:userId/avatar`, multipart field `avatar`.
- Requires the existing `admin-jwt` guard and an existing `User.isSystem = true`.
  Regular user JWTs do not grant access. Role/name/UUID are not editable here.
- Bounded in-memory upload and raster signature validation precede filesystem writes.
- Reuses `ForumPublicProfilesService.updateAvatar` and `forum_public_profiles.avatar_url`.
- Files: `${UPLOADS_DIR || '/var/www/nemory-uploads'}/forum/avatars/`.
  Every upload gets a new UUID URL to avoid stale image caches.
- Old files are removed only after persistence and only if no profile references
  them. Failed persistence removes the new file while keeping the old avatar.
  Cleanup now uses the same upload root as writing (previously it used cwd/uploads).
- The system-profile seed preserves existing avatars. Missing avatars use the seed
  assets; Nemory now uses the current logo PNG. Do not rerun the seed to replace an
  existing avatar: use the admin form.

Production avatars have not been changed by this local implementation.

## Validation

- 7 HTTP/storage tests passed with an isolated upload directory and repository
  doubles: admin guard wiring, system-only target, valid upload, shared-file
  preservation, invalid/missing/spoofed/SVG files, size limit and database failure.
  The existing JWT strategy is reused; the HTTP suite substitutes authentication.
- 3 seed tests passed: preserve custom/legacy avatars, apply current logo when missing.
- Landing TypeScript passed. Scoped ESLint passed with one pre-existing
  `CommunityClient` effect-dependency warning; backend scoped ESLint and diff checks passed.
- The packaged preset and seed PNG have the same SHA-256 as the mobile app icon.
- Authenticated browser review and production upload remain unverified.
