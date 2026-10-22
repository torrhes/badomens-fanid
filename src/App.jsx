import { useRef, useState } from 'react';
import FanIdForm from './components/FanIdForm.jsx';
import FanIdPreview from './components/FanIdPreview.jsx';
import { toPngBlob, download } from './lib/exportPng.js';
import { isValidHandle, SHARE_TEXT } from './lib/validate.js';
import { useMediaQuery } from './lib/useMediaQuery.js';
const EMPTY = { handle: '', name: '', photo: null, photoSrc: null, year: '', top: [] };
export default function App() {
  const [s, setS] = useState(EMPTY);
  const [am, setAm] = useState({ t: '', c: '' });
  const stage = useRef(null);
  const vertical = useMediaQuery('(max-width: 640px)');
  const blob = async () => {
    if (!isValidHandle(s.handle)) { setAm({ t: 'Add your X handle first.', c: 'err' }); return null; }
    setAm({ t: 'Generating…', c: '' });
    return toPngBlob(stage.current.querySelector('#scene'));
  };
  const dl = async () => {
    const b = await blob(); if (!b) return;
    download(b, 'bad-omens-fan-id.png'); setAm({ t: 'Downloaded bad-omens-fan-id.png', c: 'ok' });
  };
  const share = async () => {
    const b = await blob(); if (!b) return;
    const f = new File([b], 'bad-omens-fan-id.png', { type: 'image/png' });
    if (navigator.canShare?.({ files: [f] })) { try { await navigator.share({ files: [f], text: SHARE_TEXT }); setAm({ t: '', c: '' }); } catch {} return; }
    setAm({ t: 'Sharing isn’t supported here. Download the image instead.', c: '' });
  };
  return (<>
    <header>
      <div className="an kicker">AN INDEPENDENT FAN PROJECT</div>
      <h1>BAD OMENS</h1><div className="an tag">FAN ID</div>
      <p>Your music. Your story. Your place in the fandom. Build your collectible Fan ID with your X profile and your Top 5!</p>
    </header>
    <main>
      <FanIdForm state={s} setState={setS} onReset={() => { setS(EMPTY); setAm({ t: '', c: '' }); }} />
      <section className="stage" aria-label="Preview" ref={stage}>
        <FanIdPreview vertical={vertical} handle={s.handle} name={s.name} photo={s.photo} year={s.year} top={s.top} />
        <div className="actions">
          <button className="pri" type="button" onClick={dl}>DOWNLOAD YOUR FAN ID</button>
          <button type="button" onClick={share}>SHARE</button>
        </div>
        <div className={`msg ${am.c}`} role="status">{am.t}</div>
      </section>
    </main>
    <footer><p>An independent fan project by Nayara Ferreira · @pearlygates404<br />
    Not affiliated with or endorsed by Bad Omens or its representatives. 
    Not an official credential.<br />
     <a href="https://unavatar.io">Avatars provided by Unavatar</a></p></footer>
  </>);
}
