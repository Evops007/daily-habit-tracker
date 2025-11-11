import { neon } from '@netlify/neon'
import bcrypt from 'bcrypt'

const sql = neon() // bruker NETLIFY_DATABASE_URL automatisk
const SALT_ROUNDS = 10

export async function handler(event) {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: JSON.stringify({ error: "Method Not Allowed" }) }
    }

    const { email, password } = JSON.parse(event.body || "{}")
    if (!email || !password) {
      return { statusCode: 400, body: JSON.stringify({ error: "E-post og passord kreves" }) }
    }

    // Hash passordet
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    // Legg til bruker i DB
    await sql`
      INSERT INTO users (email, password)
      VALUES (${email}, ${hashedPassword})
    `

    return { statusCode: 200, body: JSON.stringify({ message: "Bruker registrert!" }) }
  } catch (err) {
    console.error(err)
    return { statusCode: 500, body: JSON.stringify({ error: "Server error" }) }
  }
}
