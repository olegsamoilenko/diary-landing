'use client'

import { useState } from 'react'
import clsx from 'clsx'
import { ChevronDown } from 'lucide-react'

type FaqItem = {
  question: string
  answer: string
}

type FAQAccordionProps = {
  items: FaqItem[]
}

type FAQAccordionItemProps = {
  item: FaqItem
  isOpen: boolean
  onToggle: () => void
}

function FAQAccordionItem({ item, isOpen, onToggle }: FAQAccordionItemProps) {
  return (
    <div
      className={clsx(
        'overflow-hidden rounded-3xl border transition-all duration-300',
        'border-landing-border bg-landing-surface/80 backdrop-blur-sm',
        isOpen && 'border-landing-border-strong bg-landing-surface',
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
      >
        <span className="text-landing-text-strong pr-2 text-base font-medium md:text-lg">
          {item.question}
        </span>

        <span
          className={clsx(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300',
            'border-landing-border bg-landing-soft text-landing-text',
            isOpen &&
              'border-landing-primary/30 bg-landing-primary-soft text-landing-primary rotate-180',
          )}
        >
          <ChevronDown className="h-5 w-5" />
        </span>
      </button>

      <div
        className={clsx(
          'grid transition-all duration-300 ease-out',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <div className="px-5 pt-0 pb-5 md:px-6 md:pb-6">
            <div className="bg-landing-divider mb-4 h-px w-full" />
            <p className="text-landing-text max-w-3xl text-sm leading-7 md:text-base">
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <FAQAccordionItem
          key={item.question}
          item={item}
          isOpen={openIndex === index}
          onToggle={() =>
            setOpenIndex((prev) => (prev === index ? null : index))
          }
        />
      ))}
    </div>
  )
}
