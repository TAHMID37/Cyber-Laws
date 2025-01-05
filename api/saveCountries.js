import { writeFile } from 'fs/promises';
import { join } from 'path';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const filePath = join(process.cwd(), 'js', 'data', 'countries.json');
        await writeFile(filePath, JSON.stringify(req.body, null, 2));
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error saving countries:', error);
        res.status(500).json({ error: 'Failed to save countries data' });
    }
}