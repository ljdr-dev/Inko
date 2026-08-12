import { join } from 'path'
import { app } from 'electron'
import { mkdir, readdir, readFile, writeFile, unlink } from 'fs/promises'
import type { Doc } from '../types'

function getDocDir(): string {
    return join(app.getPath('userData'), 'docs')
}

export async function listDocs(): Promise<Doc[]> {
    const dir = getDocDir()
    await mkdir(dir, { recursive: true })

    const filenames = await  readdir(dir)
    const docs: Doc[] = []

    for (const filename of filenames) {
        const content = await readFile(join(dir, filename), 'utf-8')
        docs.push(JSON.parse(content))
    }

    return docs
}

export async function saveDoc(doc: Doc): Promise<void> {
    const dir = getDocDir()
    await mkdir(dir, { recursive: true })
    await writeFile(join(dir, `${doc.id}.json`), JSON.stringify(doc, null, 2))
}

export async function deleteDoc(id: string): Promise<void> {
    const dir = getDocDir()
    await unlink(join(dir, `${id}.json`))
}