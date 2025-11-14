import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export async function handler(event) {
  try {
    const cookieHeader = event.headers.cookie || ""
    const match = cookieHeader.match(/session=([^;]+)/)
    if (!match) {
      return { statusCode: 401, body: JSON.stringify({ error: "Ikke logget inn" }) }
    }

    const token = match[1]

    let decoded
    try {
      decoded = jwt.verify(token, JWT_SECRET)
    } catch (err) {
      return { statusCode: 401, body: JSON.stringify({ error: "Ugyldig token" }) }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        id: decoded.userId,
        email: decoded.email
      })
    }

  } catch (err) {
    console.error("me error:", err)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Serverfeil" })
    }
  }
}
