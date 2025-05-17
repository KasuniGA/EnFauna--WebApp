import { admin } from "../config/firebase-admin.js" // Assuming you have Firebase Admin SDK set up

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Unauthorized: No token provided" })
    }

    const token = authHeader.split(" ")[1]

    // Verify the token
    const decodedToken = await admin.auth().verifyIdToken(token)

    // Add user ID to request
    req.userId = decodedToken.uid

    next()
  } catch (error) {
    console.error("Error verifying token:", error)
    return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" })
  }
}
