import { useState } from "react";

const STEP_FIELDS = [
  {
    id: "name",
    label: "Your Name",
    type: "text",
    placeholder: "e.g. Amara",
    icon: "✦",
  },
  {
    id: "age",
    label: "Age",
    type: "number",
    placeholder: "e.g. 28",
    icon: "◈",
  },
  {
    id: "hairType",
    label: "Hair Type",
    type: "select",
    icon: "◎",
    options: [
      { value: "", label: "Select your hair type..." },
      { value: "1a", label: "1A — Straight & Fine" },
      { value: "1b", label: "1B — Straight & Medium" },
      { value: "1c", label: "1C — Straight & Coarse" },
      { value: "2a", label: "2A — Wavy & Fine" },
      { value: "2b", label: "2B — Wavy & Medium" },
      { value: "2c", label: "2C — Wavy & Coarse" },
      { value: "3a", label: "3A — Curly & Loose" },
      { value: "3b", label: "3B — Curly & Springy" },
      { value: "3c", label: "3C — Curly & Tight" },
      { value: "4a", label: "4A — Coily & Soft" },
      { value: "4b", label: "4B — Coily & Wiry" },
      { value: "4c", label: "4C — Coily & Zigzag" },
    ],
  },
  {
    id: "scalpType",
    label: "Scalp Type",
    type: "select",
    icon: "◇",
    options: [
      { value: "", label: "Select scalp type..." },
      { value: "oily", label: "Oily" },
      { value: "dry", label: "Dry" },
      { value: "normal", label: "Normal" },
      { value: "combination", label: "Combination" },
      { value: "sensitive", label: "Sensitive" },
    ],
  },
  {
    id: "concerns",
    label: "Hair Concerns",
    type: "multiselect",
    icon: "◉",
    options: [
      "Frizz",
      "Breakage",
      "Hair loss",
      "Dryness",
      "Dandruff",
      "Color-treated",
      "Heat damage",
      "Lack of volume",
      "Split ends",
      "Slow growth",
    ],
  },
  {
    id: "lifestyle",
    label: "Lifestyle",
    type: "select",
    icon: "◈",
    options: [
      { value: "", label: "Select lifestyle..." },
      { value: "active", label: "Very active / athlete" },
      { value: "moderate", label: "Moderately active" },
      { value: "sedentary", label: "Mostly sedentary" },
      { value: "outdoorsy", label: "Lots of outdoor exposure" },
    ],
  },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body { background: #0d0d0d; }

  .app {
    min-height: 100vh;
    background: #0d0d0d;
    color: #e8ddd0;
    font-family: 'Cormorant Garamond', serif;
    position: relative;
    overflow-x: hidden;
  }

  .noise {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    opacity: 0.04;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  }

  .orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
  }
  .orb-1 { width: 500px; height: 500px; background: radial-gradient(circle, #7c4a2520 0%, transparent 70%); top: -100px; right: -100px; }
  .orb-2 { width: 400px; height: 400px; background: radial-gradient(circle, #c8985830 0%, transparent 70%); bottom: -80px; left: -80px; }

  .container {
    position: relative;
    z-index: 1;
    max-width: 680px;
    margin: 0 auto;
    padding: 60px 24px 100px;
  }

  .header {
    text-align: center;
    margin-bottom: 64px;
  }

  .header-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.3em;
    color: #c89858;
    text-transform: uppercase;
    margin-bottom: 16px;
  }

  .header h1 {
    font-size: clamp(42px, 8vw, 72px);
    font-weight: 300;
    line-height: 1.05;
    letter-spacing: -0.01em;
    color: #f0e8dc;
  }

  .header h1 em {
    font-style: italic;
    color: #c89858;
  }

  .header-sub {
    margin-top: 20px;
    font-size: 17px;
    font-weight: 300;
    color: #a09080;
    line-height: 1.6;
    font-style: italic;
  }

  .divider {
    display: flex;
    align-items: center;
    gap: 16px;
    margin: 48px 0;
  }
  .divider-line { flex: 1; height: 1px; background: linear-gradient(to right, transparent, #5a4a3a, transparent); }
  .divider-dot { color: #c89858; font-size: 8px; }

  .form-card {
    background: linear-gradient(145deg, #1a1410 0%, #120e0a 100%);
    border: 1px solid #2a2018;
    border-radius: 2px;
    padding: 48px 48px;
    position: relative;
    overflow: hidden;
  }

  .form-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #c8985808 0%, transparent 50%);
    pointer-events: none;
  }

  .form-grid {
    display: grid;
    gap: 32px;
  }

  .field-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .field-label {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.2em;
    color: #c89858;
    text-transform: uppercase;
  }

  .field-label span { opacity: 0.6; }

  input[type="text"], input[type="number"], select {
    width: 100%;
    background: #0a0806;
    border: 1px solid #2a2018;
    border-radius: 1px;
    padding: 14px 18px;
    color: #e8ddd0;
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px;
    font-weight: 300;
    transition: border-color 0.2s, background 0.2s;
    outline: none;
    -webkit-appearance: none;
  }

  input:focus, select:focus {
    border-color: #c89858;
    background: #0f0c08;
  }

  select option { background: #1a1410; color: #e8ddd0; }

  .multiselect-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .chip {
    padding: 8px 16px;
    border: 1px solid #2a2018;
    border-radius: 1px;
    font-family: 'Cormorant Garamond', serif;
    font-size: 15px;
    font-weight: 300;
    color: #a09080;
    background: #0a0806;
    cursor: pointer;
    transition: all 0.2s;
    user-select: none;
  }

  .chip:hover { border-color: #5a4a3a; color: #e8ddd0; }
  .chip.selected { border-color: #c89858; color: #c89858; background: #1a130820; }

  .submit-btn {
    width: 100%;
    margin-top: 16px;
    padding: 18px 32px;
    background: linear-gradient(135deg, #c89858 0%, #a07840 100%);
    border: none;
    border-radius: 1px;
    color: #0d0d0d;
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.1s;
    position: relative;
    overflow: hidden;
  }

  .submit-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #ffffff20 0%, transparent 60%);
  }

  .submit-btn:hover { opacity: 0.9; }
  .submit-btn:active { transform: scale(0.99); }
  .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  /* RESULT */
  .result-card {
    background: linear-gradient(145deg, #1a1410 0%, #120e0a 100%);
    border: 1px solid #2a2018;
    border-radius: 2px;
    padding: 48px;
    animation: fadeUp 0.6s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .result-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 36px;
  }

  .result-title {
    font-size: 28px;
    font-weight: 300;
    color: #f0e8dc;
    line-height: 1.2;
  }

  .result-title em { font-style: italic; color: #c89858; }

  .badge {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.2em;
    color: #c89858;
    border: 1px solid #c8985860;
    padding: 4px 10px;
    white-space: nowrap;
    margin-top: 4px;
  }

  .ritual-content {
    font-size: 17px;
    font-weight: 300;
    line-height: 1.85;
    color: #c8bfb5;
    white-space: pre-wrap;
  }

  .ritual-content strong {
    color: #e8ddd0;
    font-weight: 400;
  }

  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    padding: 64px 0;
  }

  .loading-ring {
    width: 48px; height: 48px;
    border: 1px solid #2a2018;
    border-top-color: #c89858;
    border-radius: 50%;
    animation: spin 1.2s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .loading-text {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.3em;
    color: #5a4a3a;
    text-transform: uppercase;
  }

  .reset-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: 40px;
    background: none;
    border: 1px solid #2a2018;
    color: #a09080;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.2em;
    padding: 12px 20px;
    cursor: pointer;
    text-transform: uppercase;
    transition: all 0.2s;
  }

  .reset-btn:hover { border-color: #5a4a3a; color: #e8ddd0; }

  @media (max-width: 600px) {
    .form-card, .result-card { padding: 32px 24px; }
    .container { padding: 40px 16px 80px; }
  }
`;

export default function HairCareApp() {
  const [form, setForm] = useState({ name: "", age: "", hairType: "", scalpType: "", concerns: [], lifestyle: "" });
  const [loading, setLoading] = useState(false);
  const [ritual, setRitual] = useState(null);

  const handleChange = (id, value) => setForm(f => ({ ...f, [id]: value }));

  const toggleConcern = (c) => {
    setForm(f => ({
      ...f,
      concerns: f.concerns.includes(c) ? f.concerns.filter(x => x !== c) : [...f.concerns, c],
    }));
  };

  const isValid = form.hairType && form.scalpType && form.age;

  const handleSubmit = async () => {
    if (!isValid) return;
    setLoading(true);
    setRitual(null);

    const prompt = `You are a luxury hair care specialist. Create a personalized hair care ritual for:
- Name: ${form.name || "the user"}
- Age: ${form.age}
- Hair type: ${form.hairType}
- Scalp type: ${form.scalpType}
- Hair concerns: ${form.concerns.length ? form.concerns.join(", ") : "none specified"}
- Lifestyle: ${form.lifestyle || "not specified"}

Write a detailed, beautiful ritual with:
1. A poetic one-sentence summary of their hair profile
2. Morning Ritual (2-3 steps)
3. Wash Day Ritual (3-4 steps, frequency recommendation included)
4. Weekly Treatment (1-2 steps)
5. Lifestyle & Nutrition tips (2-3 tips tailored to their age and concerns)
6. A closing affirmation

Use a warm, luxurious, editorial tone. Be specific — name actual ingredients to look for (not brand names). Format with bold section titles. Keep it under 500 words.`;

    try {
      const response = await fetch("/api/ritual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await response.json();
      const text = data.content?.map(b => b.text || "").join("\n") || "Unable to generate ritual.";
      setRitual(text);
    } catch {
      setRitual("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const reset = () => {
    setRitual(null);
    setForm({ name: "", age: "", hairType: "", scalpType: "", concerns: [], lifestyle: "" });
  };

  // Format ritual text with bold markers
  const formatRitual = (text) => {
    return text.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="noise" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />

        <div className="container">
          <header className="header">
            <p className="header-eyebrow">◆ Personalized Care ◆</p>
            <h1>Your Hair<br /><em>Ritual</em></h1>
            <p className="header-sub">A bespoke regimen crafted for your unique crown</p>
          </header>

          {!ritual && !loading && (
            <div className="form-card">
              <div className="form-grid">
                {STEP_FIELDS.map((field) => (
                  <div className="field-group" key={field.id}>
                    <label className="field-label">
                      <span>{field.icon}</span> {field.label}
                    </label>

                    {field.type === "text" && (
                      <input type="text" placeholder={field.placeholder}
                        value={form[field.id]}
                        onChange={e => handleChange(field.id, e.target.value)} />
                    )}

                    {field.type === "number" && (
                      <input type="number" placeholder={field.placeholder} min="10" max="99"
                        value={form[field.id]}
                        onChange={e => handleChange(field.id, e.target.value)} />
                    )}

                    {field.type === "select" && (
                      <select value={form[field.id]} onChange={e => handleChange(field.id, e.target.value)}>
                        {field.options.map(o => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    )}

                    {field.type === "multiselect" && (
                      <div className="multiselect-grid">
                        {field.options.map(o => (
                          <button key={o}
                            className={`chip ${form.concerns.includes(o) ? "selected" : ""}`}
                            onClick={() => toggleConcern(o)}>
                            {o}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <button className="submit-btn" onClick={handleSubmit} disabled={!isValid}>
                  Reveal My Ritual →
                </button>
              </div>
            </div>
          )}

          {loading && (
            <div className="result-card">
              <div className="loading-state">
                <div className="loading-ring" />
                <p className="loading-text">Crafting your ritual</p>
              </div>
            </div>
          )}

          {ritual && !loading && (
            <div className="result-card">
              <div className="result-header">
                <div>
                  <p className="header-eyebrow" style={{ textAlign: "left", marginBottom: 10 }}>◆ Your Ritual ◆</p>
                  <h2 className="result-title">
                    {form.name ? <><em>{form.name}'s</em> Ritual</> : <>Your <em>Personal</em> Ritual</>}
                  </h2>
                </div>
                <div className="badge">{form.hairType?.toUpperCase()} · {form.scalpType}</div>
              </div>

              <div className="ritual-content">{formatRitual(ritual)}</div>

              <button className="reset-btn" onClick={reset}>← Start over</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
