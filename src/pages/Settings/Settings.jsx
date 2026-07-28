import { useState } from 'react';

export default function Settings() {
  const [businessName, setBusinessName] = useState('Bella Hair Studio');
  const [saved, setSaved] = useState(false);
  const whatsappConnected = true;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <main className="main">
      <h1 className="main__title">Settings</h1>
      <p className="main__subtitle">Manage your account and WhatsApp connection.</p>

      <div className="form-section">
        <div className="form-section__label">Business name</div>
        <input type="text" className="form-input" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
      </div>

      <div className="form-section">
        <div className="form-section__label">WhatsApp connection</div>
        <div className="connection-status">
          <span className={'connection-dot' + (whatsappConnected ? ' connection-dot--online' : '')} />
          <span className="connection-status__text">{whatsappConnected ? 'Connected' : 'Not connected'}</span>
          <button className="save-button save-button--small connection-status__action">
            {whatsappConnected ? 'Reconnect' : 'Connect WhatsApp'}
          </button>
        </div>
        <p className="form-section__hint">Uses the same WhatsApp connection as your Digital Tavern automation account.</p>
      </div>

      <div className="form-section">
        <div className="form-section__label">Plan</div>
        <div className="plan-card">
          <span className="plan-card__name">Pro</span>
          <span className="plan-card__desc">Unlimited customers, WhatsApp automation included.</span>
        </div>
      </div>

      <button className="save-button" onClick={handleSave}>Save changes</button>
      {saved && <div className="save-confirmation">Saved</div>}
    </main>
  );
}
