import { useState } from 'react';
import styles from '../styles/Registration.module.css';
const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/registration', { method: "POST", body: JSON.stringify({ email, password }) });
    if (response.status === 200) router.push('/login');
    if (response.status === 400) setError('Invalid credentials');

    setEmail('');
    setPassword('');
  };

  return (
    <div className={styles['register-container']}>
      <div className={styles['register-form']}>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
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
          <button type="submit">Register</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default Register;
