import { useState, useMemo } from 'react';

const CUSTOMERS = [
  { name: 'Thabo N.', phone: '082 xxx 4521', current: 5, total: 6, lastVisit: '2 days ago' },
  { name: 'Lerato M.', phone: '071 xxx 8890', current: 0, total: 6, lastVisit: '40 min ago', justRedeemed: true },
  { name: 'Sipho K.', phone: '063 xxx 1102', current: 1, total: 6, lastVisit: '1 hr ago' },
  { name: 'Amara D.', phone: '079 xxx 6634', current: 6, total: 6, lastVisit: '5 days ago' },
  { name: 'Zanele P.', phone: '084 xxx 2298', current: 3, total: 6, lastVisit: '1 week ago' },
  { name: 'Kagiso B.', phone: '072 xxx 7743', current: 2, total: 6, lastVisit: '3 days ago' },
];

export default function Customers() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(
    () => CUSTOMERS.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  return (
    <main className="main">
      <h1 className="main__title">Customers</h1>
      <p className="main__subtitle">See who's close to a reward.</p>

      <input
        type="text"
        className="form-input search-input"
        placeholder="Search customers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="customers-list">
        {filtered.map((customer) => {
          const isReady = customer.current >= customer.total;
          const percent = Math.min(100, (customer.current / customer.total) * 100);

          return (
            <div className="customer-row" key={customer.phone}>
              <div className="customer-row__info">
                <span className="customer-row__name">{customer.name}</span>
                <span className="customer-row__phone">{customer.phone} - Last visit {customer.lastVisit}</span>
              </div>

              <div className="customer-row__progress">
                {isReady ? (
                  <span className="status-pill status-pill--ready">
                    {customer.justRedeemed ? 'Redeemed' : 'Reward ready'}
                  </span>
                ) : (
                  <>
                    <div className="progress-bar">
                      <div className="progress-bar__fill" style={{ width: percent + '%' }} />
                    </div>
                    <span className="progress-label">
                      {customer.current}/{customer.total}
                    </span>
                  </>
                )}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <p style={{ color: 'var(--silver-500)', fontSize: '0.85rem' }}>No customers match "{search}".</p>
        )}
      </div>
    </main>
  );
}
