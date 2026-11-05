import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import { createRequire } from 'node:module'
import ts from 'typescript'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

const require = createRequire(import.meta.url)
function load(path, overrides = {}, globals = {}) {
  const exports = {}
  const code = ts.transpileModule(
    readFileSync(new URL(path, import.meta.url), 'utf8'),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
    },
  ).outputText
  runInNewContext(code, {
    exports,
    URLSearchParams,
    require: (name) => {
      if (name in overrides) return { __esModule: true, ...overrides[name] }
      if (name.startsWith('@/components/admin/community/')) {
        return {
          __esModule: true,
          default: (props) =>
            React.createElement('span', {
              'data-action': name.split('/').pop(),
              'data-target': props.id,
            }),
        }
      }
      if (name.startsWith('@/')) return {}
      return require(name)
    },
    console: { log() {}, error() {} },
    ...globals,
  })
  return exports
}
const tag = (name) =>
  function TestElement({ children, ...props }) {
    return React.createElement(name, props, children)
  }
const Button = ({ asChild, children, variant, size, ...props }) =>
  asChild
    ? React.cloneElement(children, props)
    : React.createElement('button', props, children)
const ui = {
  '@/components/ui/table': Object.fromEntries(
    Object.entries({
      Table: 'table',
      TableHead: 'th',
      TableHeader: 'thead',
      TableRow: 'tr',
      TableBody: 'tbody',
      TableCell: 'td',
    }).map(([name, element]) => [name, tag(element)]),
  ),
  '@/components/ui/button': { Button },
  '@/types': {
    ForumContentStatus: {
      PUBLISHED: 'published',
      REMOVED_BY_MODERATOR: 'removed_by_moderator',
    },
  },
}
const CommunityTable = load(
  '../components/admin/community/CommunityTable.tsx',
  ui,
).default
const topic = {
  id: 'synthetic-topic-id',
  authorId: 7,
  author: { name: 'Test author' },
  category: { title: 'Habits' },
  title: 'Test topic',
  lang: 'uk',
  isSystem: true,
  commentsCount: 2,
  viewsCount: 3,
  likesCount: 1,
  visibility: 'public',
}
for (const variant of ['classic', 'v2']) {
  test(`${variant}: published topic retains edit, removal and delete actions`, () => {
    const html = renderToStaticMarkup(
      React.createElement(CommunityTable, {
        variant,
        topics: [{ ...topic, status: 'published' }],
        systemUsers: [],
        adminId: 5,
      }),
    )
    for (const name of [
      'EditSystemTopicDialog',
      'ModerationRemoveTopicDialog',
      'ModerationDeleteTopicDialog',
    ])
      assert.ok(html.includes(`data-action="${name}"`))
    assert.ok(!html.includes('data-action="ModerationRestoreTopicDialog"'))
    assert.ok(html.includes('Test topic'))
    assert.ok(html.includes('Test author'))
  })
  test(`${variant}: removed topic offers restore, never removal`, () => {
    const html = renderToStaticMarkup(
      React.createElement(CommunityTable, {
        variant,
        topics: [{ ...topic, isSystem: false, status: 'removed_by_moderator' }],
        systemUsers: [],
        adminId: 5,
      }),
    )
    assert.ok(html.includes('data-action="ModerationRestoreTopicDialog"'))
    assert.ok(!html.includes('data-action="ModerationRemoveTopicDialog"'))
    assert.ok(!html.includes('data-action="EditSystemTopicDialog"'))
  })
}
test('URL pagination has no clickable page 0 or next page outside results', () => {
  const Pagination = load('../components/ui/pagination.tsx', {
    ...ui,
    'next/link': { default: tag('a') },
    'next/navigation': {
      usePathname: () => '/admin-v2/community',
      useSearchParams: () => new URLSearchParams(),
    },
  }).default
  const single = renderToStaticMarkup(
    React.createElement(Pagination, { page: 1, pageCount: 1 }),
  )
  assert.ok(!single.includes('page=0'))
  assert.ok(!single.includes('page=2'))
  assert.equal((single.match(/disabled=""/g) ?? []).length, 2)
  const middle = renderToStaticMarkup(
    React.createElement(Pagination, { page: 2, pageCount: 3 }),
  )
  assert.ok(middle.includes('/admin-v2/community?page=1'))
  assert.ok(middle.includes('/admin-v2/community?page=3'))
})
test('comment lookup sends the page size used by the comment list', async () => {
  const calls = []
  const api = load(
    '../lib/api/community.ts',
    {},
    {
      fetch: async (url) => {
        calls.push(url)
        return { ok: true, json: async () => ({ page: 2, limit: 40 }) }
      },
    },
  )
  await api.getCommentLocationInTopic('topic-id', 'comment-id', 40)
  assert.equal(
    calls[0],
    '/api/admin/forum/topics/topic-id/comments/comment-id/location?limit=40',
  )
})
