import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../../api/loyaltyApi';

const INDUSTRIES = [
  'Hair Salon', 'Beauty Salon', 'Nail Salon', 'Spa',
  'General Practice (GP)', 'Dentist', 'Physiotherapy', 'Private Clinic',
  'Retail', 'Restaurant / Cafe', 'Other',
];

export default function Signup({ onLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('Other');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await signup({
        name,
        email,
        password,
        business_name: businessName,
        industry,
      });
      onLogin(data.token, data.user);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="login-card__logo">Loyalty<span>Tavern</span></div>
        <p className="login-card__subtitle">Start your free trial - no credit card required.</p>

        <div className="form-section">
          <label className="form-section__label" htmlFor="signup-name">Your name</label>
          <input type="text" id="signup-name" name="name" className="form-input" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="form-section">
          <label className="form-section__label" htmlFor="signup-business">Business name</label>
          <input type="text" id="signup-business" name="business_name" className="form-input" value={businessName} onChange={(e) => setBusinessName(e.target.value)} required />
        </div>

        <div className="form-section">
          <label className="form-section__label" htmlFor="signup-industry">Industry</label>
          <select id="signup-industry" name="industry" className="form-input" value={industry} onChange={(e) => setIndustry(e.target.value)}>
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
        </div>

        <div className="form-section">
          <label className="form-section__label" htmlFor="signup-email">Email</label>
          <input type="email" id="signup-email" name="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="form-section">
          <label className="form-section__label" htmlFor="signup-password">Password</label>
          <input type="password" id="signup-password" name="password" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
        </div>

        {error && <p className="login-error">{error}</p>}

        <button className="save-button login-card__submit" type="submit" disabled={loading}>
          {loading ? 'Creating account...' : 'Start free trial'}
        </button>

        <p className="login-card__subtitle" style={{ marginTop: '16px', marginBottom: 0, textAlign: 'center' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--blue-400)' }}>Log in</Link>
        </p>
      </form>
    </div>
  );
}
