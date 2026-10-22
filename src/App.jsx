import { useRef, useState } from 'react';
import FanIdForm from './components/FanIdForm.jsx';
import FanIdPreview from './components/FanIdPreview.jsx';
import { toPngBlob, download } from './lib/exportPng.js';
import { isValidHandle, SHARE_TEXT,  SHARE_URL } from './lib/validate.js';
import { useMediaQuery } from './lib/useMediaQuery.js';
const EMPTY = { handle: '', name: '', photo: null, photoSrc: null, year: '', top: [] };
export default function App() {
  const [s, setS] = useState(EMPTY);
  const [am, setAm] = useState({ t: '', c: '' });
  const exportRef = useRef(null);
  const [code] = useState(() => String(Math.floor(Math.random() * 1e6)).padStart(6, '0'));
  const vertical = useMediaQuery('(max-width: 640px)');
  const blob = async () => {
    if (!isValidHandle(s.handle)) {
      setAm({ t: 'Add your X handle to begin.', c: 'err' });
      return null;
    }

    const scene = exportRef.current?.querySelector('.scene.export') || document.querySelector('.scene.export');
    if (!scene) {
      setAm({ t: 'Preview isn’t ready yet. Please try again.', c: 'err' });
      return null;
    }

    setAm({ t: 'Creating your card…', c: '' });

    try {
      return await toPngBlob(scene);
    } catch (error) {
      console.error('PNG export failed', error);
      setAm({ t: 'Something went wrong while creating the image.', c: 'err' });
      return null;
    }
  };
  const dl = async () => {
    const b = await blob(); if (!b) return;
    download(b, 'bad-omens-fan-id.png'); setAm({ t: 'Downloaded bad-omens-fan-id.png', c: 'ok' });
  };
const share = async () => {
  if (!isValidHandle(s.handle)) { setAm({ t: 'Add your X handle first.', c: 'err' }); return; }
  const text = `${SHARE_TEXT} ${SHARE_URL}`; // link dentro do texto: vários apps ignoram o campo `url` quando há arquivo
  const probe = new File([''], 'x.png', { type: 'image/png' });

  // 1) Celular: folha nativa com imagem + texto + link
  if (navigator.canShare?.({ files: [probe] })) {
    const b = await blob(); if (!b) return;
    const file = new File([b], 'bad-omens-fan-id.png', { type: 'image/png' });
    try { await navigator.share({ files: [file], text }); setAm({ t: '', c: '' }); }
    catch (e) { if (e.name !== 'AbortError') setAm({ t: 'Could not share. Download the image instead.', c: 'err' }); }
    return;
  }

  // 2) Desktop: abre o composer do X e põe a imagem na área de transferência.
  //    A janela e o clipboard precisam ser chamados logo no clique (antes do await demorado).
  const win = window.open('about:blank', '_blank');
  const pending = blob();
  let copied = false;
  try {
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': pending })]);
    copied = true;
  } catch {}
  const b = await pending;
  if (!b) { win?.close(); return; }
  if (!copied) download(b, 'bad-omens-fan-id.png');

  const url = `https://x.com/intent/post?text=${encodeURIComponent(SHARE_TEXT)}&url=${encodeURIComponent(SHARE_URL)}`;
  if (win) win.location.href = url; else window.location.assign(url);
  setAm({
    t: copied ? 'Image copied: press Ctrl+V (⌘+V) in the post.' : 'Image downloaded: attach it to the post.',
    c: 'ok',
  });
};
  return (<>
    <header>
      <div className="an kicker">AN INDEPENDENT FAN PROJECT</div>
      <h1>BAD OMENS</h1><div className="an tag">FAN ID</div>
      <p>Your music. Your story. Your place in the fandom. Create your own Bad Omens fan card with your X profile and Top 5 picks.</p>
    </header>
    <main>
      <FanIdForm state={s} setState={setS} onReset={() => { setS(EMPTY); setAm({ t: '', c: '' }); }} />
      <section className="stage" aria-label="Preview" ref={exportRef}>
        <div className="export-scene" aria-hidden="true">
          <FanIdPreview exportMode vertical={false} code={code} handle={s.handle} name={s.name} photo={s.photo} year={s.year} top={s.top} />
        </div>
        <FanIdPreview vertical={vertical} code={code} handle={s.handle} name={s.name} photo={s.photo} year={s.year} top={s.top} />
        <div className="actions">
          <button className="pri" type="button" onClick={dl}>DOWNLOAD</button>
          <button type="button" onClick={share}>SHARE</button>
        </div>
        <div className={`msg ${am.c}`} role="status">{am.t}</div>
      </section>
    </main>
    <footer><p>Fan project by Nayara Ferreira · <a href="https://x.com/pearlygates404" target="_blank" rel="noopener noreferrer">@pearlygates404</a><br />
    Not affiliated with or endorsed by Bad Omens or its representatives. 
    Not an official credential.<br />
     <a href="https://unavatar.io">Avatars provided by Unavatar</a></p></footer>
  </>);
}
