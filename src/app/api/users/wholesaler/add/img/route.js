import { writeFile } from 'fs/promises'

export async function POST(req) {

    const data = await req.formData()
    const img = data.get('img')
    if (!img) {
        console.log('img not found')
        return new Response(JSON.stringify({ status: 400 }))
    }
    const byteData = await img.arrayBuffer()
    const buffer = Buffer.from(byteData)

    const path = `./public/images/${img.name}`

    await writeFile(path, buffer);

    return new Response(JSON.stringify({ status: 200 }))
}