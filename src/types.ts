import type { JSONContent } from "@tiptap/react"

export interface Doc {
  id: string
  title: string
  content?: JSONContent
}
