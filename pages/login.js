import { useState } from 'react';
import styles from '../styles/Registration.module.css';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/Auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();
  const auth = useAuth(); // Get the auth object from useAuth hook
  const { user, logout } = auth || {};

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
      });

      if (response.status === 200) {
        router.push('/');
      } else if (response.status === 400) {
        const responseData = await response.json().catch(() => null);
        if (responseData && responseData.error) {
          setError(responseData.error);
        }
      }
    } catch (error) {
      console.error('Login failed', error);
    }

    setEmail('');
    setPassword('');
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/logout');
      if (logout) {
        logout(); // Update the user state to reflect logout
      }
      router.push('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div className={styles['register-container']}>
      {!user ? (
        <div className={styles['register-form']}>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
        </div>
      ) : (
        <div>
          <div>You are already logged in</div>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
