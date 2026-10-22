import { useState } from 'react';
import { isValidHandle, normalizeHandle } from '../lib/validate.js';
import { fetchXProfile } from '../lib/xProfile.js';
import TopFiveSelector from './TopFiveSelector.jsx';
import SelectField from './SelectField.jsx';
const NOW = new Date().getFullYear();
const YEARS = [
  { value: '', label: '—' },
  ...Array.from({ length: NOW - 2014 }, (_, i) => String(NOW - i)).map((y) => ({ value: y, label: y })),
];
const MSG = {
  not_configured: 'X lookup is not configured on this site. Upload a photo instead; your @ is used on the card.',
  failed: 'Could not reach X. Upload a photo instead.',
};
export default function FanIdForm({ state, setState, onReset }) {
  const [msg, setMsg] = useState({ t: '', c: '' });
  const set = (p) => setState((s) => ({ ...s, ...p }));
  const onHandle = (e) => {
    const h = normalizeHandle(e.target.value);
    set({ handle: h, ...(state.photoSrc === 'x' ? { photo: null, photoSrc: null } : {}) });
    setMsg(h && !isValidHandle(h) ? { t: 'Use 1–15 letters, numbers or underscore.', c: 'err' } : { t: '', c: '' });
  };
  const importX = async () => {
    if (!isValidHandle(state.handle)) return setMsg({ t: 'Enter a valid X handle first.', c: 'err' });
    setMsg({ t: 'Looking up…', c: '' });
    try {
      const d = await fetchXProfile(state.handle);
      if (d.protected || !d.photo) {
        set({ handle: d.username || state.handle, name: d.name || '', photo: null, photoSrc: null });
        setMsg({ t: d.protected ? 'Private profile: using your @ only.' : 'No photo available: using your @ only.', c: 'ok' });
      } else {
        set({ handle: d.username, name: d.name || '', photo: d.photo, photoSrc: 'x' });
        setMsg({ t: 'Profile photo imported.', c: 'ok' });
      }
    } catch (e) { setMsg({ t: MSG[e.message] || MSG.failed, c: 'err' }); }
  };
  return (
    <form onSubmit={(e) => e.preventDefault()} noValidate>
      <fieldset>
        <legend>01 / IDENTITY</legend>
        <label htmlFor="h">YOUR X USERNAME(REQUIRED)</label>
        <div className="row">
          <input id="h" value={state.handle ? '@' + state.handle : ''} onChange={onHandle} autoComplete="off" placeholder="myusername" aria-describedby="hm" required />
          <button type="button" onClick={importX}>IMPORT FROM X</button>
        </div>
        <div id="hm" className={`msg ${msg.c}`} role="status">{msg.t}</div>
        <label htmlFor="y">FAN SINCE (YEAR)</label>
        <SelectField id="y" value={state.year} onChange={(year) => set({ year })} options={YEARS} />
      </fieldset>
      <TopFiveSelector top={state.top} setTop={(top) => set({ top })} />
      <button type="button" onClick={onReset}>RESET</button>
    </form>
  );
}
