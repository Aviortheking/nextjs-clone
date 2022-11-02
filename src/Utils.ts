import fs from 'fs/promises'

export async function exists(path: string): Promise<boolean> {
	try {
		await fs.access(path + `.tsx`)
		return true
	} catch {
		return false
	}
}