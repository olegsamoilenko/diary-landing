export type EditorRef = {
  get: () => { html: string; docJson: any }
  setHtml?: (html: string) => void
}
