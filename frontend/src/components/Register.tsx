import { useState } from 'react';
import './Register.css';

interface RegisterProps {
  onSwitch: () => void;
}

function Register({ onSwitch }: RegisterProps) {
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    console.log('Form submitted:', form);
  };

  return (
    <div className="register-container">
      <h2>Register</h2>

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>Register</button>

      <p>
        Already have an account?{' '}
        <span className="switch-link" onClick={onSwitch}>
          Login
        </span>
      </p>
    </div>
  );
}

export default Register;