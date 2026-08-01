import { useState, useEffect, useMemo, useRef } from 'react';
import { getCustomers, stampVisit } from '../../api/loyaltyApi';
import { timeAgo } from '../../utils/formatTime';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [recording, setRecording] = useState(false);
  const [result, setResult] = useState('');
  const submittingRef = useRef(false);

  const loadCustomers = () => {
    getCustomers()
      .then((data) => setCustomers(data))
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    loadCustomers();
    setLoading(false);
  }, []);

  const filtered = useMemo(
    () => customers.filter((c) => (c.name || '').toLowerCase().includes(search.toLowerCase())),
    [customers, search]
  );

  const handleRecordVisit = async (e) => {
    e.preventDefault();
    if (submittingRef.current) return; // synchronous guard - blocks a second click instantly, before React state even updates
    if (!phone.trim()) return;
    submittingRef.current = true;
    setRecording(true);
    setResult('');
    setError('');
    try {
      const data = await stampVisit(phone.trim(), name.trim() || undefined);
      if (data.isNew) {
        setResult(`New customer added - Stamp 1 recorded.`);
      } else if (data.isClaimed) {
        setResult(`Reward claimed for ${data.customer.name || phone} - new cycle started.`);
      } else if (data.isRewardUnlocked) {
        setResult(`Reward unlocked for ${data.customer.name || phone}!`);
      } else {
        setResult(`Stamp ${data.customer.current_stamps} recorded.`);
      }
      setPhone('');
      setName('');
      loadCustomers();
    } catch (err) {
      setError(err.message);
    } finally {
      setRecording(false);
      submittingRef.current = false;
    }
  };

  if (loading) {
    return (
      <main className="main">
        <h1 className="main__title">Customers</h1>
        <p className="main__subtitle">Loading...</p>
      </main>
    );
  }

  return (
    <main className="main">
      <h1 className="main__title">Customers</h1>
      <p className="main__subtitle">See who's close to a reward.</p>

      <form className="record-visit" onSubmit={handleRecordVisit}>
        <div className="form-section__label">Record a visit</div>
        <div className="record-visit__row">
          <input
            type="tel"
            id="visit-phone"
            name="phone"
            className="form-input"
            placeholder="Customer phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="text"
            id="visit-name"
            name="name"
            className="form-input"
            placeholder="Name (optional, first visit only)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="save-button save-button--small" type="submit" disabled={recording}>
            {recording ? 'Recording...' : 'Add stamp'}
          </button>
        </div>
        {result && <p className="save-confirmation">{result}</p>}
        {error && <p className="login-error">{error}</p>}
      </form>

      <input
        type="text"
        className="form-input search-input"
        placeholder="Search customers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="customers-list">
        {filtered.map((customer) => {
          const total = customer.rule === 'every_11th' ? 11 : 6;
          const current = customer.current_stamps || 0;
          const isReady = current >= total;
          const percent = Math.min(100, (current / total) * 100);

          return (
            <div className="customer-row" key={customer.id}>
              <div className="customer-row__info">
                <span className="customer-row__name">{customer.name || 'Unnamed'}</span>
                <span className="customer-row__phone">{customer.phone} - Last visit {timeAgo(customer.last_visit)}</span>
              </div>

              <div className="customer-row__progress">
                {isReady ? (
                  <span className="status-pill status-pill--ready">Reward ready</span>
                ) : (
                  <>
                    <div className="progress-bar">
                      <div className="progress-bar__fill" style={{ width: percent + '%' }} />
                    </div>
                    <span className="progress-label">{current}/{total}</span>
                  </>
                )}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <p style={{ color: 'var(--silver-500)', fontSize: '0.85rem' }}>
            {customers.length === 0 ? 'No customers yet.' : `No customers match "${search}".`}
          </p>
        )}
      </div>
    </main>
  );
}
