import { useState, useEffect } from 'react';
import { getWhatsappStatus, connectWhatsapp } from '../../api/loyaltyApi';

export default function Settings() {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [whapiToken, setWhapiToken] = useState('');
  const [whapiUrl, setWhapiUrl] = useState('https://gate.whapi.cloud');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const loadStatus = () => {
    getWhatsappStatus()
      .then((data) => {
        setConnected(data.connected);
        if (data.whapi_url) setWhapiUrl(data.whapi_url);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadStatus();
  }, []);

  const handleConnect = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await connectWhatsapp(whapiToken.trim(), whapiUrl.trim());
      setSaved(true);
      setWhapiToken('');
      loadStatus();
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="main">
        <h1 className="main__title">Settings</h1>
        <p className="main__subtitle">Loading...</p>
      </main>
    );
  }

  return (
    <main className="main">
      <h1 className="main__title">Settings</h1>
      <p className="main__subtitle">Manage your account and WhatsApp connection.</p>

      <div className="form-section">
        <div className="form-section__label">WhatsApp connection</div>
        <div className="connection-status">
          <span className={'connection-dot' + (connected ? ' connection-dot--online' : '')} />
          <span className="connection-status__text">{connected ? 'Connected' : 'Not connected'}</span>
        </div>
        <p className="form-section__hint" style={{ marginTop: '10px' }}>
          {connected
            ? 'Reconnecting will replace your current WhatsApp connection.'
            : 'You need a Whapi.Cloud account to connect WhatsApp. Sign up at '}
          {!connected && <a href="https://whapi.cloud" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue-400)' }}>whapi.cloud</a>}
          {!connected && ', create a channel, then paste your API token below.'}
        </p>
      </div>

      <form onSubmit={handleConnect}>
        <div className="form-section">
          <label className="form-section__label" htmlFor="whapi-token">Whapi API token</label>
          <input
            type="password"
            id="whapi-token"
            name="whapi_token"
            className="form-input"
            placeholder={connected ? 'Enter a new token to reconnect' : 'Paste your Whapi.Cloud token'}
            value={whapiToken}
            onChange={(e) => setWhapiToken(e.target.value)}
            required
          />
        </div>

        <div className="form-section">
          <label className="form-section__label" htmlFor="whapi-url">Whapi gateway URL</label>
          <input
            type="text"
            id="whapi-url"
            name="whapi_url"
            className="form-input"
            value={whapiUrl}
            onChange={(e) => setWhapiUrl(e.target.value)}
          />
          <p className="form-section__hint">Leave as default unless Whapi gave you a custom gateway URL.</p>
        </div>

        {error && <p className="login-error">{error}</p>}

        <button className="save-button" type="submit" disabled={saving}>
          {saving ? 'Connecting...' : connected ? 'Reconnect' : 'Connect WhatsApp'}
        </button>
        {saved && <div className="save-confirmation">Connected successfully</div>}
      </form>

      <div className="form-section" style={{ marginTop: '32px' }}>
        <div className="form-section__label">Plan</div>
        <div className="plan-card">
          <span className="plan-card__name">Starter</span>
          <span className="plan-card__desc">Free trial - upgrade options coming soon.</span>
        </div>
      </div>
    </main>
  );
}
