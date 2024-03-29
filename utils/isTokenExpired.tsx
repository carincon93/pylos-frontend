import jwt from 'jsonwebtoken'

export function isTokenExpired(accessToken: string, secretKey: string): boolean {
    try {
        const decodedToken: any = jwt.verify(accessToken, secretKey)
        const currentTime = Math.floor(Date.now() / 1000) // Convert milliseconds to seconds
        return decodedToken.exp < currentTime // Compare expiration time with current time
    } catch (error) {
        console.error('Error verifying token:', error)
        return true // Return true in case of error (assuming expired for safety)
    }
}
