import { useState } from 'react';

const TEMPLATES = [
  { id: 'welcome', label: 'Welcome message', hint: "Sent when a customer joins the program for the first time.", default: "Welcome to Bella Hair Studio's loyalty program! You'll earn a stamp every visit. Stamp 1/6 added.", exampleVars: {} },
  { id: 'stamp', label: 'Stamp earned', hint: "Sent every time a customer earns a stamp. Use {current} and {total} as placeholders.", default: "You're one step closer! Stamp {current}/{total} added.", exampleVars: { current: '4', total: '6' } },
  { id: 'reward', label: 'Reward unlocked', hint: "Sent when a customer reaches the final stamp.", default: "You've earned your free visit! Show this message next time you're in.", exampleVars: {} },
  { id: 'reminder', label: 'Reminder (close to reward)', hint: "Optional nudge sent to customers who are 1 stamp away but haven't visited in a while.", default: "You're just {remaining} stamp away from your free visit! We'd love to see you again soon.", exampleVars: { remaining: '1' } },
];

function renderPreview(text, vars) {
  let result = text;
  Object.entries(vars).forEach(([key, value]) => {
    result = result.replaceAll(`{`+key+`}`, value);
  });
  return result;
}

export default function Messages() {
  const [values, setValues] = useState(Object.fromEntries(TEMPLATES.map((t) => [t.id, t.default])));
  const [savedId, setSavedId] = useState(null);
  const handleChange = (id, text) => { setValues((prev) => ({ ...prev, [id]: text })); };
  const handleSave = (id) => { setSavedId(id); setTimeout(() => setSavedId(null), 2500); };

  return (
    <main className="main">
      <h1 className="main__title">WhatsApp Messages</h1>
      <p className="main__subtitle">Preview and edit what customers receive.</p>
      {TEMPLATES.map((template) => (
        <div className="form-section" key={template.id}>
          <div className="form-section__label">{template.label}</div>
          <p className="form-section__hint">{template.hint}</p>
          <textarea className="form-textarea" value={values[template.id]} onChange={(e) => handleChange(template.id, e.target.value)} />
          <div className="wa-preview">
            <div className="wa-preview__bubble">{renderPreview(values[template.id], template.exampleVars)}</div>
          </div>
          <button className="save-button save-button--small" onClick={() => handleSave(template.id)}>Save</button>
          {savedId === template.id && <span className="save-confirmation save-confirmation--inline">Saved</span>}
        </div>
      ))}
    </main>
  );
}
