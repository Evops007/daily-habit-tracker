import { neon } from '@netlify/neon'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const sql = neon()
const JWT_SECRET = process.env.JWT_SECRET

export async function handler(event) {
  try {
    if (!JWT_SECRET) {
      console.error("JWT_SECRET er ikke satt!")
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Serverkonfigurasjon mangler (JWT_SECRET ikke satt)" })
      }
    }

    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: JSON.stringify({ error: "Method Not Allowed" }) }
    }

    const { email, password, remember } = JSON.parse(event.body || "{}")

    if (!email || !password) {
      return { statusCode: 400, body: JSON.stringify({ error: "E-post og passord kreves" }) }
    }

    const rows = await sql`
      SELECT id, email, password
      FROM users
      WHERE email = ${email}
      LIMIT 1
    `

    if (rows.length === 0) {
      return { statusCode: 401, body: JSON.stringify({ error: "Feil e-post eller passord" }) }
    }

    const user = rows[0]
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return { statusCode: 401, body: JSON.stringify({ error: "Feil e-post eller passord" }) }
    }

    const expiresIn = remember ? "7d" : "1d"
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn })
    const maxAgeSeconds = remember ? 7 * 24 * 60 * 60 : 24 * 60 * 60

    return {
      statusCode: 200,
      headers: {
        "Set-Cookie": `session=${token}; Max-Age=${maxAgeSeconds}; HttpOnly; Path=/; Secure; SameSite=Strict`
      },
      body: JSON.stringify({ message: "Innlogging vellykket", email: user.email, userId: user.id })
    }

  } catch (err) {
    console.error("Login error:", err)
    return { statusCode: 500, body: JSON.stringify({ error: "Serverfeil" }) }
  }
}