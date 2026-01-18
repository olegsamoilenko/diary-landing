import { useEditor, EditorContent, EditorContext } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { HeadingDropdownMenu } from '@/components/tiptap-ui/heading-dropdown-menu'
import * as React from 'react'
import sanitizeHtml from 'sanitize-html'
import '@/components/tiptap-node/code-block-node/code-block-node.scss'
import '@/components/tiptap-node/list-node/list-node.scss'
import '@/components/tiptap-node/paragraph-node/paragraph-node.scss'
import { forwardRef, useImperativeHandle } from 'react'
import type { ReleaseNotificationsEditorRef } from '@/types'
import { ToolbarGroup } from '@/components/tiptap-ui-primitive/toolbar'
import { MarkButton } from '@/components/tiptap-ui/mark-button'
import { TaskList } from '@tiptap/extension-task-list'
import { TaskItem } from '@tiptap/extension-task-item'
import { ListDropdownMenu } from '@/components/tiptap-ui/list-dropdown-menu'
import { TextAlign } from '@tiptap/extension-text-align'
import { TextAlignButton } from '@/components/tiptap-ui/text-align-button'
import { LinkPopover } from '@/components/tiptap-ui/link-popover'
import { TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import { ColorDropdown } from '@/components/tiptap-ui/color-dropdown/color-dropdown'

const SANITIZE_OPTS: sanitizeHtml.IOptions = {
  allowedTags: [
    'p',
    'br',
    'strong',
    'em',
    'u',
    'a',
    'ul',
    'ol',
    'li',
    'h1',
    'h2',
    'h3',
    'blockquote',
    'span',
    'img',
    'hr',
    'code',
    'pre',
  ],
  allowedAttributes: {
    a: ['href', 'target', 'rel'],
    img: ['src', 'alt'],
    span: ['style'],
    p: ['style'],
    h1: ['style'],
    h2: ['style'],
    h3: ['style'],
    blockquote: ['style'],
  },
  allowedStyles: {
    '*': {
      'text-align': [/^left$|^right$|^center$|^justify$/],
      color: [/^#[0-9a-fA-F]{3,8}$/i, /^rgb\(.+\)$/, /^rgba\(.+\)$/],
    },
  },
  transformTags: {
    a: sanitizeHtml.simpleTransform('a', {
      target: '_blank',
      rel: 'noopener noreferrer',
    }),
  },

  allowedSchemes: ['http', 'https', 'mailto'],
}

const Editor = forwardRef<
  ReleaseNotificationsEditorRef,
  { initialHtml: string }
>(({ initialHtml }, ref) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TaskList,
      TaskItem,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TextStyle,
      Color,
    ],
    immediatelyRender: false,
    content: initialHtml,
  })

  useImperativeHandle(ref, () => ({
    get: () => {
      if (!editor) return { html: '', docJson: null }
      const rawHtml = editor.getHTML()
      const html = sanitizeHtml(rawHtml, SANITIZE_OPTS)
      const docJson = editor.getJSON()
      return { html, docJson }
    },
    setHtml: (html: string) => {
      editor?.commands.setContent(html, { emitUpdate: false })
    },
  }))

  if (!editor) return null

  return (
    <EditorContext.Provider value={{ editor }}>
      <div className="flex flex-wrap">
        <ToolbarGroup>
          <HeadingDropdownMenu
            editor={editor}
            levels={[1, 2, 3]}
            hideWhenUnavailable={true}
            portal={false}
          />
        </ToolbarGroup>
        <ToolbarGroup>
          <MarkButton type="bold" />
          <MarkButton type="italic" />
          <MarkButton type="strike" />
          <MarkButton type="underline" />
        </ToolbarGroup>
        <ToolbarGroup>
          <ListDropdownMenu
            editor={editor}
            types={['bulletList', 'orderedList', 'taskList']}
            hideWhenUnavailable={true}
            portal={false}
          />
        </ToolbarGroup>
        <ToolbarGroup>
          <TextAlignButton align="left" />
          <TextAlignButton align="center" />
          <TextAlignButton align="right" />
          <TextAlignButton align="justify" />
        </ToolbarGroup>
        <ToolbarGroup>
          <LinkPopover
            editor={editor}
            hideWhenUnavailable={true}
            autoOpenOnLinkActive={true}
          />
        </ToolbarGroup>
        <ToolbarGroup>
          <ColorDropdown editor={editor}></ColorDropdown>
        </ToolbarGroup>
      </div>

      <div className="rounded border p-2">
        <EditorContent
          editor={editor}
          className="ProseMirror prose min-h-[120px]"
          role="presentation"
        />
      </div>
    </EditorContext.Provider>
  )
})

Editor.displayName = 'Editor'

export default Editor
