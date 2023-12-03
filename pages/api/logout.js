export default async function handler(req, res) {
  // Clear the authentication token cookie
  try {
    res.setHeader('Set-Cookie', 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly');
  
    // Redirect the user to the login page
    res.writeHead(302, { Location: '/login' });
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout failed', error);
    return res.status(500).json({ message: 'Internal server error during logout' });
  }
}