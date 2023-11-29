export default function handler(req, res) {
    // Clear the authentication token cookie
    res.setHeader('Set-Cookie', 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly');
  
    // Redirect the user to the login page
    res.writeHead(302, { Location: '/login' });
    res.end();
  }
  