import { useState, useEffect } from 'react';
import { getStats, getActivity, getProgram } from '../../api/loyaltyApi';
import { timeAgo } from '../../utils/formatTime';

const BADGE_CLASS = {
  stamp: 'badge--progress',
  redeemed: 'badge--redeemed',
  new_customer: 'badge--new',
};

export default function Overview() {
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState([]);
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([getStats(), getActivity(), getProgram()])
      .then(([statsData, activityData, programData]) => {
        setStats(statsData);
        setActivity(activityData);
        setProgram(programData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="main">
        <h1 className="main__title">Overview</h1>
        <p className="main__subtitle">Loading...</p>
      </main>
    );
  }

  const ruleLabel = program?.rule === 'every_11th' ? 'Every 11th visit free' : 'Every 6th visit free';

  const STAT_ITEMS = stats
    ? [
        { label: 'Active customers', value: stats.activeCustomers },
        { label: 'Stamps this month', value: stats.stampsThisMonth },
        { label: 'Rewards redeemed', value: stats.rewardsRedeemed },
        { label: 'Close to reward', value: stats.closeToReward, accent: true },
      ]
    : [];

  return (
    <main className="main">
      <h1 className="main__title">Overview</h1>
      <p className="main__subtitle">{program?.business_name || 'Your business'} - {ruleLabel}</p>
      {error && <p className="login-error">{error}</p>}

      <div className="stat-grid">
        {STAT_ITEMS.map((stat) => (
          <div className="stat-card" key={stat.label}>
            <div className="stat-card__label">{stat.label}</div>
            <div className={'stat-card__value' + (stat.accent ? ' stat-card__value--accent' : '')}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      <div className="section-label">Recent activity</div>
      <div className="activity-list">
        {activity.map((item, i) => (
          <div className="activity-row" key={i}>
            <span className="activity-row__name">
              {item.name}
              <span className={'activity-row__badge ' + (BADGE_CLASS[item.type] || 'badge--new')}>{item.detail}</span>
            </span>
            <span className="activity-row__time">{timeAgo(item.created_at)}</span>
          </div>
        ))}
        {activity.length === 0 && (
          <p style={{ color: 'var(--silver-500)', fontSize: '0.85rem' }}>No activity yet.</p>
        )}
      </div>
    </main>
  );
}

