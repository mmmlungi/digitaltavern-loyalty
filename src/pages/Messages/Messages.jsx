import { useState, useEffect } from 'react';
import { getMessages, saveMessage, getProgram } from '../../api/loyaltyApi';

const TEMPLATE_META = [
  { id: 'welcome', label: 'Welcome message', hint: 'Sent when a customer joins the program for the first time.', exampleVars: {} },
  { id: 'stamp', label: 'Stamp earned', hint: 'Sent every time a customer earns a stamp. Use {current} and {total} as placeholders.', exampleVars: { current: '4', total: '6' } },
  { id: 'reward', label: 'Reward unlocked', hint: 'Sent when a customer reaches the final stamp.', exampleVars: {} },
  { id: 'reminder', label: 'Reminder (close to reward)', hint: 'Optional nudge sent to customers who are 1 stamp away but have not visited in a while.', exampleVars: { remaining: '1' } },
];

function renderPreview(text, vars) {
  let result = text || '';
  Object.entries(vars).forEach(([key, value]) => {
    result = result.replaceAll(`{`+key+`}`, value);
  });
  return result;
}

export default function Messages() {
  const [values, setValues] = useState({});
  const [businessName, setBusinessName] = useState('Your Business');
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [savedId, setSavedId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([getMessages(), getProgram()])
      .then(([messagesData, programData]) => {
        setValues(messagesData);
        if (programData?.business_name) setBusinessName(programData.business_name);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (id, text) => {
    setValues((prev) => ({ ...prev, [id]: text }));
  };

  const handleSave = async (id) => {
    setSavingId(id);
    setError('');
    try {
      await saveMessage(id, values[id]);
      setSavedId(id);
      setTimeout(() => setSavedId(null), 2500);
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingId(null);
    }
  };

  if (loading) {
    return (
      <main className="main">
        <h1 className="main__title">WhatsApp Messages</h1>
        <p className="main__subtitle">Loading...</p>
      </main>
    );
  }

  return (
    <main className="main">
      <h1 className="main__title">WhatsApp Messages</h1>
      <p className="main__subtitle">Preview and edit what customers receive.</p>
      {error && <p className="login-error">{error}</p>}

      {TEMPLATE_META.map((template) => {
        const vars = template.id === 'welcome' ? { ...template.exampleVars, business_name: businessName } : template.exampleVars;
        return (
          <div className="form-section" key={template.id}>
            <div className="form-section__label">{template.label}</div>
            <p className="form-section__hint">{template.hint}</p>

            <textarea
              className="form-textarea"
              value={values[template.id] || ''}
              onChange={(e) => handleChange(template.id, e.target.value)}
            />

            <div className="wa-preview">
              <div className="wa-preview__bubble">
                {renderPreview(values[template.id], vars)}
              </div>
            </div>

            <button className="save-button save-button--small" onClick={() => handleSave(template.id)} disabled={savingId === template.id}>
              {savingId === template.id ? 'Saving...' : 'Save'}
            </button>
            {savedId === template.id && <span className="save-confirmation save-confirmation--inline">Saved</span>}
          </div>
        );
      })}
    </main>
  );
}
