
import jwt from "jsonwebtoken"
import jwksClient from "jwks-rsa"



const client = jwksClient({
  jwksUri: `https://${process.env.PUB_SUP}.supabase.co/auth/v1/.well-known/jwks.json`,
})

const getKey = (header, callback) => {
  client.getSigningKey(header.kid, function (err, key) {
    if (err) {
      callback(err)
      return
    }
    const signingKey = key.getPublicKey()
    callback(null, signingKey)
  })
}

export const verifySupabaseToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(
      token,
      getKey,
      {
        // ✅ ALLOW ES256 (AND RS256 FOR SAFETY)
        algorithms: ["ES256", "RS256"],
        audience: "authenticated",
        issuer: `https://${process.env.PUB_SUP}.supabase.co/auth/v1`,
      },
      (err, decoded) => {
        if (err) {
          reject(err)
        } else {
          resolve(decoded)
        }
      }
    )
  })
