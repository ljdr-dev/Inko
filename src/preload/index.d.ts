import { ElectronAPI } from '@electron-toolkit/preload'
import type { Doc } from '../types'

interface Api {
  listDocs: () => Promise<Doc[]>
  saveDoc: (doc: Doc) => Promise<void>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}
