import { useState } from 'react';
import './Login.css';

interface LoginProps {
  onSwitch: () => void;
}

function Login({ onSwitch }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    console.log('Login submitted:', {
      username,
      password,
    });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={username}
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>Login</button>

      <p>
        Don't have an account?{' '}
        <span className="switch-link" onClick={onSwitch}>
          Register
        </span>
      </p>
    </div>
  );
}

export default Login;