import { neon } from '@netlify/neon'

const sql = neon()

export async function handler(event) {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: JSON.stringify({ error: "Method Not Allowed" }) }
    }

    const { navn, ikon, dato, varsel, user_id } = JSON.parse(event.body || "{}")

    if (!navn || !ikon || !user_id) {
      return { statusCode: 400, body: JSON.stringify({ error: "Navn, ikon og user_id kreves" }) }
    }

    const rows = await sql`
      INSERT INTO habits (navn, ikon, dato, varsel, user_id)
      VALUES (${navn}, ${ikon}, ${dato || null}, ${varsel || false}, ${user_id})
      RETURNING *
    `

    return { statusCode: 200, body: JSON.stringify(rows[0]) }

  } catch (err) {
    console.error("addHabit error:", err)
    return { statusCode: 500, body: JSON.stringify({ error: "Serverfeil" }) }
  }
}
