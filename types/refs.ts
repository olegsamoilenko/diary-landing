export type ReleaseNotificationsEditorRef = {
  get: () => { html: string; docJson: any }
  setHtml?: (html: string) => void
}
