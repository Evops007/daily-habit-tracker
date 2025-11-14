import { neon } from '@netlify/neon'
import jwt from 'jsonwebtoken'

const sql = neon()
const JWT_SECRET = process.env.JWT_SECRET

export async function handler(event) {
  try {
    // Hent cookie fra headers
    const cookieHeader = event.headers.cookie || ""
    const match = cookieHeader.match(/session=([^;]+)/)
    if (!match) {
      return { statusCode: 401, body: JSON.stringify({ error: "Ikke logget inn" }) }
    }

    const token = match[1]

    // Verifiser JWT
    let decoded
    try {
      decoded = jwt.verify(token, JWT_SECRET)
    } catch (err) {
      return { statusCode: 401, body: JSON.stringify({ error: "Ugyldig token" }) }
    }

    const userId = decoded.userId

    // Hent vaner for brukeren
    const rows = await sql`
      SELECT *
      FROM habits
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `

    return {
      statusCode: 200,
      body: JSON.stringify(rows)
    }
  } catch (err) {
    console.error("getHabits error:", err)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Serverfeil" })
    }
  }
}
