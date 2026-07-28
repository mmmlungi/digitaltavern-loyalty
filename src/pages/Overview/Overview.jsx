const STATS = [
  { label: 'Active customers', value: '142' },
  { label: 'Stamps this month', value: '318' },
  { label: 'Rewards redeemed', value: '27' },
  { label: 'Close to reward', value: '19', accent: true },
];

const ACTIVITY = [
  { name: 'Thabo N.', detail: 'Stamp 5/6', type: 'progress', time: '2 min ago' },
  { name: 'Lerato M.', detail: 'Reward redeemed', type: 'redeemed', time: '40 min ago' },
  { name: 'Sipho K.', detail: 'New customer - Stamp 1/6', type: 'new', time: '1 hr ago' },
];

const BADGE_CLASS = {
  progress: 'badge--progress',
  redeemed: 'badge--redeemed',
  new: 'badge--new',
};

export default function Overview() {
  return (
    <main className="main">
      <h1 className="main__title">Overview</h1>
      <p className="main__subtitle">Bella Hair Studio - Every 6th visit free</p>

      <div className="stat-grid">
        {STATS.map((stat) => (
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
        {ACTIVITY.map((item, i) => (
          <div className="activity-row" key={i}>
            <span className="activity-row__name">
              {item.name}
              <span className={'activity-row__badge ' + BADGE_CLASS[item.type]}>{item.detail}</span>
            </span>
            <span className="activity-row__time">{item.time}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
