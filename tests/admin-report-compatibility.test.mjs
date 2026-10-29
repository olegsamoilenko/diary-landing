import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import { createRequire } from 'node:module'
import ts from 'typescript'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

const require = createRequire(import.meta.url)
function load(relative, overrides = {}, globals = {}) {
  const exports = {}
  const source = readFileSync(new URL(relative, import.meta.url), 'utf8')
  runInNewContext(
    ts.transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
    }).outputText,
    {
      exports,
      require: (name) => (name in overrides ? overrides[name] : require(name)),
      console: { log() {}, error() {} },
      URLSearchParams,
      ...globals,
    },
  )
  return exports
}
const { toAdminUser, toAdminPlan } = load(
  '../../diary-back/src/users/admin-user-projection.ts',
)
const { projectForumResponse } = load(
  '../../diary-back/src/forum/forum-response-projection.ts',
  { '../users/admin-user-projection': { toAdminUser } },
)
const raw = {
  id: 7,
  uuid: 'synthetic-uuid',
  name: 'Synthetic User',
  email: 'test@example.com',
  regionCode: 'UA',
  createdAt: '2026-10-01T00:00:00Z',
  lastActiveAt: '2026-10-28T00:00:00Z',
  acquisitionMetaJson: null,
  password: 'must-not-render',
  hash: 'must-not-render',
}
const user = {
  ...toAdminUser(raw),
  entriesStatsCount: 12,
  dialogsStatsCount: 4,
  checkinsStatsCount: 2,
  checkinDialogsStatsCount: 3,
  goalsStatsCount: 1,
  forumTopicsStats: 9,
  forumCommentsStats: 8,
  plan: toAdminPlan({ name: 'lite', planStatus: 'active' }),
}
// Render the real table components. Substitute only UI primitives and unused
// closed dialogs, so property access and row text run against the new contract.
const tag =
  (name) =>
  ({ children }) =>
    React.createElement(name, null, children)
const ui = {
  '@/components/ui/table': {
    Table: tag('table'),
    TableBody: tag('tbody'),
    TableCell: tag('td'),
    TableHead: tag('th'),
    TableHeader: tag('thead'),
    TableRow: tag('tr'),
  },
  '@/components/ui/button': { Button: tag('button') },
  '@/components/admin/user-list/UserLogs': { default: () => null },
  '@/components/ui/JsonViewer': { JsonViewer: () => null },
  '@/lib/utils/formatAcquisitionSource': {
    formatAcquisitionSource: () => 'Organic',
  },
  '@/lib/api/monitoring': {
    deleteUserMonitoring: () => {
      throw new Error('No writes in rendering test')
    },
  },
}
for (const [path, props] of [
  [
    '../components/admin/user-monitoring/AllMonitoringUsersTable.tsx',
    {
      monitoringRes: [
        { id: 17, type: 'all', description: 'Synthetic monitoring', user },
      ],
    },
  ],
  [
    '../components/admin/users-activity/UsersActivityTable.tsx',
    {
      activityRecords: [
        { id: 1, day: '2026-10-28', entries: 2, dialogs: 1, user },
      ],
    },
  ],
])
  test(`live admin table renders projected data: ${path}`, () => {
    const Component = load(path, ui).default
    const html = renderToStaticMarkup(React.createElement(Component, props))
    for (const text of [
      'Synthetic User',
      'test@example.com',
      'lite',
      'active',
      '>12<',
      '>4<',
    ])
      assert.ok(html.includes(text), text)
    assert.ok(!html.includes('must-not-render'))
  })

const calls = []
const response = { messages: [], total: 0, page: 1, pageCount: 1, limit: 10 }
const fetch = async (url, options = {}) => {
  calls.push({ url, options })
  return {
    ok: true,
    json: async () => response,
    text: async () => JSON.stringify(response),
  }
}
const { apiFetch } = load(
  '../lib/api/apiFetch.ts',
  {
    '@/lib/errors': { ApiError: Error, getErrorMessage: String },
    '@/lib/utils/toast/notify': { notify: { error() {} } },
  },
  { fetch },
)
const support = load('../lib/api/support.ts', {}, { fetch })
const monitoring = load(
  '../lib/api/monitoring.ts',
  { '@/lib/api/apiFetch': { apiFetch } },
  { fetch },
)
const statistics = load(
  '../lib/api/usersStatistics.ts',
  { '@/lib/api/apiFetch': { apiFetch } },
  { fetch },
)
test('existing wrappers preserve cookie transport, filters, mutations and compact activity', async () => {
  assert.equal(
    await support.getSupportMessages({
      page: 2,
      limit: 20,
      userUuid: 'synthetic-uuid',
    }),
    response,
  )
  await support.updateSupportMessageStatus(17, 'CLOSED')
  await monitoring.getUserMonitoring('all')
  await monitoring.deleteUserMonitoring(17)
  await statistics.getUsersActivityRecords(
    new Date('2026-10-01'),
    new Date('2026-10-29'),
    'all',
  )
  await statistics.getPaidUsersProfile()
  assert.equal(calls.length, 6)
  for (const { url, options } of calls) {
    assert.ok(url.startsWith('/api/'))
    // fetch defaults to same-origin cookies; apiFetch explicitly uses include.
    assert.notEqual(options.credentials, 'omit')
  }
  assert.match(calls[0].url, /page=2&limit=20&userUuid=synthetic-uuid/)
  assert.equal(calls[3].options.method, 'DELETE')
  assert.equal(JSON.parse(calls[3].options.body).id, 17)
  assert.equal(JSON.parse(calls[4].options.body).compact, true)
})

test('moderation ban/unban wrappers keep the ID from the safe author contract', async () => {
  const target = projectForumResponse(
    { authorId: raw.id, author: { ...raw, settings: { lang: 'uk' } } },
    'admin',
  )
  assert.equal(target.author.id, target.authorId)
  assert.equal(target.author.name, raw.name)
  assert.equal(target.author.email, raw.email)
  assert.equal(target.author.settings.lang, 'uk')
  assert.ok(!JSON.stringify(target).includes('must-not-render'))
  const moderationCalls = []
  const moderation = load('../lib/api/moderation.ts', {}, {
    fetch: async (url, options) => {
      moderationCalls.push({ url, options })
      return { ok: true, json: async () => ({ success: true }) }
    },
  })
  const restriction = {
    type: 'permanent_ban', reason: 'Synthetic test', violationCount: 1,
    createdByAdminId: 8,
  }
  await moderation.restrictUser(target.authorId, restriction)
  await moderation.unrestrictUser(target.authorId, { createdByAdminId: 8 })
  assert.equal(moderationCalls.length, 2)
  for (const [index, action] of ['restrict', 'unrestrict'].entries()) {
    const { url, options } = moderationCalls[index]
    assert.equal(url, `/api/forum/user-restrictions/7/${action}`)
    assert.equal(options.method, 'POST')
    assert.notEqual(options.credentials, 'omit')
  }
  assert.deepEqual(JSON.parse(moderationCalls[0].options.body), restriction)
})
