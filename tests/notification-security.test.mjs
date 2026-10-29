import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import { createRequire } from 'node:module'
import ts from 'typescript'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { parseDocument } from 'htmlparser2'

const require = createRequire(import.meta.url)
function load(relative, overrides = {}, globals = {}) {
  const exports = {}
  runInNewContext(
    ts.transpileModule(
      readFileSync(new URL(relative, import.meta.url), 'utf8'),
      {
        compilerOptions: {
          module: ts.ModuleKind.CommonJS,
          jsx: ts.JsxEmit.ReactJSX,
          esModuleInterop: true,
        },
      },
    ).outputText,
    {
      exports,
      require: (name) => (name in overrides ? overrides[name] : require(name)),
      console: { log() {}, error() {} },
      ...globals,
    },
  )
  return exports
}
const web = load('../lib/notificationHtml.ts').sanitizeNotificationHtml
const backend = load(
  '../../diary-back/src/notifications/notification-html.ts',
).sanitizeNotificationHtml
const rich =
  '<h1 style="text-align:center">Заголовок</h1><h2>Second</h2><h3>Third</h3><p style="text-align:justify"><strong>Bold</strong><em>Italic</em><u>Underline</u><s>Strike</s><span style="color:#1976d2">Blue</span><span style="color:rgb(12, 34, 56)">RGB</span><br /></p><ol start="3"><li>Numbered</li></ol><ul><li>Bullet</li></ul><ul data-type="taskList"><li data-type="taskItem" data-checked="true"><label><input type="checkbox" checked="checked" /><span></span></label><div><p>Task</p></div></li></ul><blockquote>Quote</blockquote><pre><code>let a = 1;</code></pre><hr /><a href="https://example.com/news">Link</a><a href="mailto:test@example.com">Mail</a><img src="https://example.com/image.png" alt="Photo" />'
const attacks = [
  '<img src="x" onerror="window.__xss=1"><script>window.__xss=2</script>',
  '<a href="java&#x73;cript:alert(1)">x</a><a href="JaVaScRiPt:alert(1)">x</a><a href="data:text/html,x">x</a>',
  '<svg onload="alert(1)"><foreignObject><iframe srcdoc="<script>alert(1)</script>"></iframe></foreignObject></svg>',
  '<object data="javascript:alert(1)"></object><embed src="x"><form action="https://example.com"><input name="secret" autofocus onfocus="alert(1)"></form>',
  '<span style="color:rgb(0,0,0);position:fixed;background:url(javascript:alert(1))" onclick="alert(1)">Text</span>',
  '<a href="java\tscript:alert(1)">x</a><img src="data:image/svg+xml,x"><a href="intent://evil">x</a>',
]
function elements(html) {
  const found = []
  const walk = (node) => {
    if (node.name) found.push(node)
    for (const child of node.children ?? []) walk(child)
  }
  walk(parseDocument(html))
  return found
}
function assertSafe(html) {
  for (const node of elements(html)) {
    assert.ok(
      ![
        'script',
        'style',
        'iframe',
        'svg',
        'object',
        'embed',
        'form',
        'math',
      ].includes(node.name),
      node.name,
    )
    for (const [key, value] of Object.entries(node.attribs)) {
      assert.ok(
        !key.startsWith('on') &&
          !['srcdoc', 'action', 'formaction'].includes(key),
        key,
      )
      if (key === 'href' || key === 'src')
        assert.ok(
          !/^(javascript|vbscript|data|intent):/i.test(
            value.replace(/\s/g, ''),
          ),
          value,
        )
      if (key === 'style')
        assert.ok(
          !/url\(|expression\(|position:|background:/i.test(value),
          value,
        )
    }
    if (node.name === 'input') {
      assert.equal(node.attribs.type, 'checkbox')
      assert.ok('disabled' in node.attribs)
    }
  }
}
test('backend and admin keep the editor formatting and agree after repeated cleaning', () => {
  const safe = web(rich)
  assert.equal(backend(rich), safe)
  assert.equal(backend(safe), safe)
  const nodes = elements(safe)
  for (const name of [
    'h1',
    'h2',
    'h3',
    'strong',
    'em',
    'u',
    's',
    'span',
    'ol',
    'ul',
    'li',
    'blockquote',
    'pre',
    'code',
    'hr',
    'img',
    'input',
  ])
    assert.ok(
      nodes.some((n) => n.name === name),
      name,
    )
  assert.ok(safe.includes('color:#1976d2'))
  assert.ok(safe.includes('color:rgb(12, 34, 56)'))
  assert.ok(safe.includes('text-align:center'))
  assert.ok(safe.includes('text-align:justify'))
  assert.ok(safe.includes('start="3"'))
  assert.ok(safe.includes('data-checked="true"'))
  const links = nodes.filter((n) => n.name === 'a')
  assert.equal(links[0].attribs.href, 'https://example.com/news')
  assert.equal(links[1].attribs.href, 'mailto:test@example.com')
  for (const link of links)
    assert.equal(link.attribs.rel, 'noopener noreferrer')
  assertSafe(safe)
})
for (const [index, html] of attacks.entries())
  test(`unsafe HTML case ${index + 1} removed consistently`, () => {
    assert.equal(web(html), backend(html))
    assertSafe(web(html))
    assert.equal(web(web(html)), web(html))
  })

const tag =
  (name) =>
  ({ children }) =>
    React.createElement(name, null, children)
const table = Object.fromEntries(
  Object.entries({
    Table: 'table',
    TableBody: 'tbody',
    TableCell: 'td',
    TableHead: 'th',
    TableHeader: 'thead',
    TableRow: 'tr',
  }).map(([key, value]) => [key, tag(value)]),
)
for (const kind of ['Common', 'Release'])
  test(`${kind} real table renders old untrusted HTML safely in both languages`, () => {
    const Component = load(
      `../components/admin/notifications/All${kind}NotificationsTable.tsx`,
      {
        '@/lib/notificationHtml': { sanitizeNotificationHtml: web },
        '@/components/ui/table': table,
        [`./Delete${kind}NotificationsDialog`]: () => null,
      },
    ).default
    const html = renderToStaticMarkup(
      React.createElement(Component, {
        notifications: [
          {
            id: 7,
            createdAt: '2026-10-29T00:00:00Z',
            platform: 'android',
            build: 100,
            isUrgent: true,
            translations: ['en', 'uk'].map((locale) => ({
              locale,
              html: rich + attacks.join(''),
              title: 'Title',
            })),
          },
        ],
      }),
    )
    assertSafe(html)
    assert.equal(elements(html).filter((n) => n.name === 'strong').length, 2)
    assert.ok(html.includes('Заголовок'))
  })

for (const [kind, remove] of [
  ['common', 'deleteCommonNotification'],
  ['release', 'deleteNotification'],
]) {
  test(`${kind} API uses admin cookie transport and reports refused deletion as failure`, async () => {
    const calls = []
    let ok = true
    const api = load(
      `../lib/api/${kind}Notifications.ts`,
      {},
      {
        fetch: async (url, options = {}) => {
          calls.push({ url, options })
          return { ok, json: async () => ({ notifications: [], total: 0 }) }
        },
      },
    )
    assert.equal(await api[remove](7), true)
    ok = false
    assert.equal(await api[remove](7), false)
    assert.equal(calls[0].url, `/api/${kind}-notifications/7`)
    assert.equal(calls[0].options.method, 'DELETE')
    assert.notEqual(calls[0].options.credentials, 'omit')
  })
}
