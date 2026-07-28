import { useState } from 'react';

const RULE_OPTIONS = [
  {
    id: 'every_6th',
    title: 'Every 6th visit free',
    description: 'Customers earn a stamp per visit. Reward unlocks on the 6th.',
  },
  {
    id: 'every_11th',
    title: 'Every 11th visit free',
    description: 'Customers earn a stamp per visit. Reward unlocks on the 11th.',
  },
];

export default function ProgramSetup() {
  const [rule, setRule] = useState('every_6th');
  const [rewardDescription, setRewardDescription] = useState('');
  const [stampMessage, setStampMessage] = useState(
    "You're one step closer! Stamp {current}/{total} added."
  );
  const [rewardMessage, setRewardMessage] = useState(
    "You've earned your free visit! Show this message next time you're in."
  );
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <main className="main">
      <h1 className="main__title">Program Setup</h1>
      <p className="main__subtitle">Configure how customers earn and redeem rewards.</p>

      <div className="form-section">
        <div className="form-section__label">Reward rule</div>
        <div className="rule-options">
          {RULE_OPTIONS.map((option) => (
            <label
              key={option.id}
              className={'rule-option' + (rule === option.id ? ' rule-option--selected' : '')}
            >
              <input
                type="radio"
                name="rule"
                value={option.id}
                checked={rule === option.id}
                onChange={() => setRule(option.id)}
              />
              <span className="rule-option__text">
                <strong>{option.title}</strong>
                <span>{option.description}</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-section">
        <div className="form-section__label">What's the reward?</div>
        <p className="form-section__hint">
          e.g. "Free haircut" or "R100 off your next visit" - shown to customers on WhatsApp.
        </p>
        <input
          type="text"
          className="form-input"
          placeholder="Free haircut"
          value={rewardDescription}
          onChange={(e) => setRewardDescription(e.target.value)}
        />
      </div>

      <div className="form-section">
        <div className="form-section__label">Stamp message</div>
        <p className="form-section__hint">
          Sent every time a customer earns a stamp. Use {'{current}'} and {'{total}'} as placeholders.
        </p>
        <textarea
          className="form-textarea"
          value={stampMessage}
          onChange={(e) => setStampMessage(e.target.value)}
        />
      </div>

      <div className="form-section">
        <div className="form-section__label">Reward unlocked message</div>
        <p className="form-section__hint">Sent when a customer reaches the final stamp.</p>
        <textarea
          className="form-textarea"
          value={rewardMessage}
          onChange={(e) => setRewardMessage(e.target.value)}
        />
      </div>

      <button className="save-button" onClick={handleSave}>
        Save program
      </button>
      {saved && <div className="save-confirmation">Saved</div>}
    </main>
  );
}
