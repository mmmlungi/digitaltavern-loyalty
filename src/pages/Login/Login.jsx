import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/loyaltyApi';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login(email, password);
      onLogin(data.token, data.user);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="login-card__logo">Loyalty<span>Tavern</span></div>
        <p className="login-card__subtitle">Log in with your Digital Tavern account.</p>

        <div className="form-section">
          <label className="form-section__label" htmlFor="login-email">Email</label>
          <input type="email" id="login-email" name="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="form-section">
          <label className="form-section__label" htmlFor="login-password">Password</label>
          <input type="password" id="login-password" name="password" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        {error && <p className="login-error">{error}</p>}

        <button className="save-button login-card__submit" type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Log in'}
        </button>
      </form>
    </div>
  );
}
