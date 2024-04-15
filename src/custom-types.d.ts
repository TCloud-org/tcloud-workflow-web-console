import { Descendant, BaseEditor, BaseRange, Range, Element } from 'slate'
import { ReactEditor } from 'slate-react'
import { HistoryEditor } from 'slate-history'

export type BlockQuoteElement = {
  type: 'block-quote'
  children: Descendant[]
}

export type BulletedListElement = {
  type: 'bulleted-list'
  children: Descendant[]
}

export type CheckListItemElement = {
  type: 'check-list-item'
  checked: boolean
  children: Descendant[]
  
}

export type EditableVoidElement = {
  type: 'editable-void'
  children: EmptyText[]
  
}

export type HeadingOneElement = {
  type: 'heading-one'
  children: Descendant[]
}

export type HeadingTwoElement = {
  type: 'heading-two'
  children: Descendant[]
}

export type ImageElement = {
  type: 'image'
  url: string
  children: EmptyText[]
  
}

export type LinkElement = { type: 'link'; url: string; children: Descendant[],  }

export type ButtonElement = { type: 'button'; children: Descendant[],  }

export type BadgeElement = { type: 'badge'; children: Descendant[],  }

export type ListItemElement = { type: 'list-item'; children: Descendant[],  }

export type NumberedListElement = { type: 'numbered-list'; children: Descendant[],  }

export type MentionElement = {
  type: 'mention'
  character: string
  children: CustomText[]
  
}

export type ParagraphElement = {
  type: 'paragraph'
  children: Descendant[]
}

export type TableElement = { type: 'table'; children: TableRowElement[] }

export type TableCellElement = { type: 'table-cell'; children: CustomText[] }

export type TableRowElement = { type: 'table-row'; children: TableCellElement[] }

export type TitleElement = { type: 'title'; children: Descendant[] }

export type VideoElement = { type: 'video'; url: string; children: EmptyText[] }

export type CodeBlockElement = {
  type: 'code-block'
  language: string
  children: Descendant[]
}

export type CodeLineElement = {
  type: 'code-line'
  children: Descendant[]
}

export type CustomElement =
  (| BlockQuoteElement
  | BulletedListElement
  | CheckListItemElement
  | EditableVoidElement
  | HeadingOneElement
  | HeadingTwoElement
  | ImageElement
  | LinkElement
  | ButtonElement
  | BadgeElement
  | ListItemElement
  | NumberedListElement
  | MentionElement
  | ParagraphElement
  | TableElement
  | TableRowElement
  | TableCellElement
  | TitleElement
  | VideoElement
  | CodeBlockElement
  | CodeLineElement) & { align?: CanvasTextAlign, url?: string}

export type CustomText = {
  bold?: boolean
  italic?: boolean
  code?: boolean
  text: string
  underline?: boolean
  type?: string
}

export type EmptyText = {
  bold?: boolean
  italic?: boolean
  code?: boolean
  text: string
  underline?: boolean
  type?: string
}

export type CustomEditor = BaseEditor &
  ReactEditor &
  HistoryEditor & {
    nodeToDecorations?: Map<Element, Range[]>
  }