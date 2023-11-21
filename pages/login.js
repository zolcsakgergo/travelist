import { useState } from 'react';
import styles from '../styles/Registration.module.css';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/Auth';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();
  const user = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/login', {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password })
    });
    if (response.status === 200) router.push('/');
    if (response.status === 400) {
      res.status(400).json({ error: 'Invalid credentials' });
    }
    const responseData = await response.json().catch(() => null);
      if (response.status === 400 && responseData && responseData.error) {
      setError(responseData.error);
    }

    
    setEmail('');
    setPassword('');
   
  };

  return (
    <div className={styles['register-container']}>
      {!user ?
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
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
        : <div>You are already logged in</div>}
    </div>
  );
};

export default Login;
