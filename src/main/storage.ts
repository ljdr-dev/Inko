import { join } from 'path'
import { app } from 'electron'
import { mkdir, readdir, readFile, writeFile, unlink } from 'fs/promises'
import type { Doc } from '../types'

const pendingWrites = new Map<string, Promise<void>>()

function enqueue(id: string, task: () => Promise<void>): Promise<void> {
    const previous = pendingWrites.get(id) ?? Promise.resolve()
    const current = previous.then(task)
    pendingWrites.set(id, current.catch(() => {}))
    return current
}

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
    return enqueue(doc.id, async () => {
        await mkdir(dir, { recursive: true })
        await writeFile(join(dir, `${doc.id}.json`), JSON.stringify(doc, null, 2))
    })
}

export async function deleteDoc(id: string): Promise<void> {
    const dir = getDocDir()
    return enqueue(id, () => unlink(join(dir, `${id}.json`)))
}