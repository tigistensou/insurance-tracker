import { useState } from 'react';
import { api } from '../api';

interface Props {
  setIsLoggedIn: (value: boolean) => void;
}

const Login = ({ setIsLoggedIn }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post('/auth/login', {
        username,
        password,
      });

      // Save token
      localStorage.setItem('token', res.data.token);

      setIsLoggedIn(true);
    } catch (error) {
      alert('Login failed: Invalid username or password');
      console.log(error);
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #1d4ed8, #60a5fa)',
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          background: 'white',
          padding: '40px',
          borderRadius: '12px',
          width: '350px',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            color: '#1d4ed8',
          }}
        >
          Insurance Tracker Login
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #93c5fd',
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #93c5fd',
          }}
        />

        <button
          type="submit"
          style={{
            background: '#1d4ed8',
            color: 'white',
            border: 'none',
            padding: '12px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;