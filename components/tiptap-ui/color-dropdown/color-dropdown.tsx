import React, { useState } from 'react'
import { useEditorState } from '@tiptap/react'

const COLORS = [
  '#222',
  '#d32f2f',
  '#388e3c',
  '#1976d2',
  '#ffa000',
  '#fbc02d',
  '#7b1fa2',
  '#00acc1',
]

export function ColorDropdown({ editor }) {
  const [open, setOpen] = useState(false)
  if (!editor) return null

  // За раз отримуємо масив: [currentColor, isActive0, isActive1, ...]
  const [currentColor, ...activeStates] = useEditorState({
    editor,
    selector: (ctx) => {
      const color = ctx.editor?.getAttributes('textStyle')?.color
      return [
        typeof color === 'string' ? color : '#222',
        ...COLORS.map(
          (color) => ctx.editor?.isActive('textStyle', { color }) ?? false,
        ),
      ]
    },
  }) || ['#222', ...Array(COLORS.length).fill(false)]

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type="button"
        style={{
          width: 25,
          height: 25,
          borderRadius: '50%',
          border: `2px solid ${currentColor}`,
          background: currentColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
        title="Вибрати колір тексту"
        onClick={() => setOpen((v) => !v)}
      >
        🎨
      </button>
      {open && (
        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            background: '#fff',
            border: '1px solid #eee',
            borderRadius: 12,
            padding: 8,
            boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
            top: 40,
            left: 0,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            minWidth: 160,
          }}
        >
          {COLORS.map((color, i) => (
            <button
              key={color}
              type="button"
              onClick={() => {
                editor.chain().focus().setColor(color).run()
                setOpen(false)
              }}
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: color,
                border: activeStates[i] ? '2.5px solid #000' : '2px solid #ccc',
                boxShadow: activeStates[i] ? '0 0 0 3px #e5e7eb' : 'none',
                outline: 'none',
                margin: 2,
                transition: 'box-shadow 0.1s, border-color 0.1s',
                cursor: 'pointer',
              }}
              aria-label={`Вибрати колір ${color}`}
            />
          ))}
          {/* Скинути */}
          <button
            type="button"
            onClick={() => {
              editor.chain().focus().unsetColor().run()
              setOpen(false)
            }}
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #fff 40%, #d32f2f 100%)',
              color: '#d32f2f',
              border: '2px solid #d32f2f',
              margin: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
            }}
            aria-label="Скинути колір"
            title="Скинути колір"
          >
            ×
          </button>
        </div>
      )}
    </div>
  )
}
