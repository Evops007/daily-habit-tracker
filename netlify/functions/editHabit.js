import { neon } from '@netlify/neon'

const sql = neon()

export async function handler(event) {
    try {
        if (event.httpMethod !== "POST") {
            return { statusCode: 405, body: JSON.stringify({ error: "Method Not Allowed" }) }
        }

        const { id, navn, ikon, dato, varsel } = JSON.parse(event.body || "{}")

        if (!id) {
            return { statusCode: 400, body: JSON.stringify({ error: "Id kreves" }) }
        }

        await sql`
            UPDATE habits
            SET navn = ${navn}, ikon = ${ikon}, dato = ${dato}, varsel = ${varsel}
            WHERE id = ${id}
        `

        return { statusCode: 200, body: JSON.stringify({ message: "Vane oppdatert" }) }
    } catch (err) {
        console.error(err)
        return { statusCode: 500, body: JSON.stringify({ error: "Serverfeil" }) }
    }
}
