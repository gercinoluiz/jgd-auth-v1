import { OAuth2Client } from 'google-auth-library'

export const checkAuthProvider = {
  google: async (token: string) => {
    try {
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      })

      const { payload } = ticket.getAttributes()
      if (!payload) {
        return false
      }
      if (!payload.email_verified) {
        return false
      }
      return true
    } catch (error) {
      return false
    }
  },
}
