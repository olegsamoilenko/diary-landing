'use client'

import React, { use, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { SupportMessageStatus, SupportMessageCategory } from '@/types'
import type { SupportMessage } from '@/types'
import { statusOptions, categoryOptions } from '@/lib/constants/support'
import { Button } from '@/components/ui/button'
import {
  getSupportMessages,
  updateSupportMessageStatus,
} from '@/lib/api/support'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

type SP = { page?: string }

export default function SupportPage({
  searchParams,
}: {
  searchParams?: Promise<SP>
}) {
  const spPromise: Promise<SP> = searchParams ?? Promise.resolve({})
  const sp = use(spPromise)
  const [category, setCategory] = useState<string | undefined>(undefined)
  const [status, setStatus] = useState<string | undefined>(undefined)
  const [messages, setMessages] = useState<SupportMessage[]>([])
  const page = Number(sp.page ?? '1') || 1
  const limit = 20
  const [messageId, setMessageId] = useState<number | undefined>(undefined)
  const [email, setEmail] = useState<string | undefined>(undefined)
  const [userUuid, setUserUuid] = useState<string | undefined>(undefined)

  const toCategory = (v?: string): SupportMessageCategory | undefined =>
    v as SupportMessageCategory | undefined

  const toStatus = (v?: string): SupportMessageStatus | undefined =>
    v as SupportMessageStatus | undefined

  const loadMessages = async () => {
    const res = await getSupportMessages({
      category: toCategory(category),
      status: toStatus(status),
      messageId,
      email,
      userUuid,
      page,
      limit,
    })
    setMessages(res.messages)
  }

  const changeStatus = async (id: number, status: SupportMessageStatus) => {
    await updateSupportMessageStatus(id, status)
    await loadMessages()
  }
  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold">Support</h1>
      <div className="mb-8 flex items-end gap-4">
        <div className="flex items-end gap-4">
          <Select
            value={category}
            onValueChange={(c) => {
              setCategory(c)
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value as string}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="items-end">
          <Select
            value={status}
            onValueChange={(s) => {
              setStatus(s as SupportMessageStatus)
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value as string}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="messageId" className="mb-2">
            Id
          </Label>
          <Input
            id="messageId"
            type="number"
            value={messageId}
            onChange={(e) => setMessageId(Number(e.target.value))}
            placeholder="Message Id"
          ></Input>
        </div>
        <div>
          <Label htmlFor="email" className="mb-2">
            Email
          </Label>
          <Input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          ></Input>
        </div>
        <div>
          <Label htmlFor="userUuid" className="mb-2">
            User Uuid
          </Label>
          <Input
            id="userUuid"
            type="text"
            value={userUuid}
            onChange={(e) => setUserUuid(e.target.value)}
            placeholder="User Uuid"
          ></Input>
        </div>
        <Button onClick={loadMessages}>Show</Button>
      </div>
      <div className="border-y">
        <Accordion type="single" collapsible className="w-full">
          {messages &&
            messages.length > 0 &&
            messages.map((message) => (
              <AccordionItem key={message.id} value={String(message.id)}>
                <AccordionTrigger className="w-full">
                  <div className="mr-10 flex-0">{message.id}</div>
                  <div className="mr-10 flex-0">{message.user.name}</div>
                  <div className="flex-0">{message.category}</div>
                  <div className="mr-4 flex-0">{message.status}</div>
                  <div className="flex-1 truncate" style={{ maxWidth: '70ch' }}>
                    {message.title}
                  </div>
                  <div className="flex-1 truncate" style={{ maxWidth: '70ch' }}>
                    {message.text}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex gap-4">
                  <div className="w-1/3">
                    <div className="mb-1">
                      <span className="font-bold">User Id: </span>
                      {message.user.id}
                    </div>
                    <div className="mb-1">
                      <span className="font-bold">User UUid: </span>
                      {message.user.uuid}
                    </div>
                    <div className="mb-4">
                      <span className="font-bold">User email: </span>
                      {message.user.email}
                    </div>
                    <div className="mb-1">
                      <span className="font-bold">Email: </span>
                      {message.email}
                    </div>
                    <div className="mb-1">
                      <span className="font-bold">Created At: </span>
                      {new Date(message.createdAt).toLocaleString()}
                    </div>
                    <div className="mb-1">
                      <span className="font-bold">Updated At: </span>
                      {new Date(message.updatedAt).toLocaleString()}
                    </div>
                    {message.status === SupportMessageStatus.NEW && (
                      <div className="mb-1">
                        <span className="font-bold">Closed At: </span>
                        {new Date(
                          message.closedAt
                            ? new Date(message.closedAt).toLocaleString()
                            : '—',
                        ).toLocaleString()}
                      </div>
                    )}
                    <div className="flex items-center gap-4">
                      <span className="font-bold">Change status: </span>
                      <Select
                        value={message.status}
                        onValueChange={async (s) => {
                          await changeStatus(
                            message.id,
                            s as SupportMessageStatus,
                          )
                        }}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value as string}
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="">
                    <h3 className="mb-5">{message.title}</h3>
                    <p>{message.text}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </div>
    </div>
  )
}
