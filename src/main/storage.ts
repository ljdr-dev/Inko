import { join } from 'path'
import { app } from 'electron'
import { mkdir, readdir, readFile, writeFile, unlink } from 'fs/promises'
import type { Doc } from '../types'

const pendingWrites = new Map<string, Promise<void>>()

function getDocDir(): string {
    return join(app.getPath('userData'), 'docs')
}

export async function listDocs(): Promise<Doc[]> {
    const dir = getDocDir()
    await mkdir(dir, { recursive: true })

    const filenames = await  readdir(dir)
    const docs: Doc[] = []

    for (const filename of filenames) {
        if (!filename.endsWith('.json')) continue
        try {
            const content = await readFile(join(dir, filename), 'utf-8')
            docs.push(JSON.parse(content))
        } catch (error) {
            console.error(`No se pudo leer el documento ${filename}: `, error)
        }
    }

    return docs
}

export async function saveDoc(doc: Doc): Promise<void> {
    const dir = getDocDir()
    const previous = pendingWrites.get(doc.id) ?? Promise.resolve()
    const current = previous.then(async () => {
        await mkdir(dir, { recursive: true })
        await writeFile(join(dir, `${doc.id}.json`), JSON.stringify(doc, null, 2))
    })
    pendingWrites.set(doc.id, current.catch(() => {}))
    return current
}

export async function deleteDoc(id: string): Promise<void> {
    const dir = getDocDir()
    await unlink(join(dir, `${id}.json`))
}