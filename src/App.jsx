import { useEffect, useRef, useState } from 'react';
import FanIdForm from './components/FanIdForm.jsx';
import FanIdPreview from './components/FanIdPreview.jsx';
import { toPngBlob, download, getShareUrl, getMobileXAppUrl } from './lib/exportPng.js';
import { isCardComplete, isValidHandle, SHARE_TEXT, SHARE_URL } from './lib/validate.js';
import { useMediaQuery } from './lib/useMediaQuery.js';

const EMPTY = { handle: '', name: '', photo: null, photoSrc: null, year: '', top: [] };

export default function App() {
  const [s, setS] = useState(EMPTY);
  const [am, setAm] = useState({ t: '', c: '' });
  const [exportLayout, setExportLayout] = useState('horizontal');
  const exportRef = useRef(null);
  const [code] = useState(() => String(Math.floor(Math.random() * 1e6)).padStart(6, '0'));
  const vertical = useMediaQuery('(max-width: 640px)');
  const previewVertical = exportLayout === 'vertical' ? true : exportLayout === 'horizontal' ? false : vertical;
  const isReady = isCardComplete(s);
  const fileRef = useRef(null);

  useEffect(() => {
    fileRef.current = null;
    if (!isValidHandle(s.handle)) return;
    let cancelled = false;
    const t = setTimeout(async () => {
      try {
        const b = await toPngBlob(exportRef.current.querySelector('.scene'), exportLayout);
        if (!cancelled && b) fileRef.current = new File([b], `bad-omens-fan-id-${exportLayout}.png`, { type: 'image/png' });
      } catch (e) {
        console.error(e);
      }
    }, 800);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [s.handle, s.name, s.photo, s.year, s.top, exportLayout]);

  const blob = async (layout = exportLayout) => {
    if (!isReady) {
      setAm({ t: 'Complete all required fields before downloading or sharing.', c: 'err' });
      return null;
    }

    const scene = exportRef.current?.querySelector('.scene.export') || document.querySelector('.scene.export');
    if (!scene) {
      setAm({ t: 'Preview isn’t ready yet. Please try again.', c: 'err' });
      return null;
    }

    setAm({ t: 'Creating your card…', c: '' });

    try {
      return await toPngBlob(scene, layout);
    } catch (error) {
      console.error('PNG export failed', error);
      setAm({ t: 'Something went wrong while creating the image.', c: 'err' });
      return null;
    }
  };

  const dl = async () => {
    if (!isReady) {
      setAm({ t: 'Complete all required fields before downloading.', c: 'err' });
      return;
    }
    const b = await blob(exportLayout);
    if (!b) return;
    const name = `bad-omens-fan-id-${exportLayout}.png`;
    download(b, name);
    setAm({ t: `Downloaded ${name}`, c: 'ok' });
  };

  const share = async () => {
    if (!isReady) {
      setAm({ t: 'Complete all required fields before sharing.', c: 'err' });
      return;
    }

    const file = fileRef.current;
    const text = `${SHARE_TEXT} ${SHARE_URL}`;
    const shareUrl = getShareUrl(SHARE_TEXT, SHARE_URL);
    const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(window.navigator.userAgent) || navigator.maxTouchPoints > 1;

    if (navigator.canShare && file) {
      try {
        await navigator.share({ files: [file], text });
        setAm({ t: '', c: '' });
        return;
      } catch (e) {
        if (e && e.name === 'AbortError') {
          setAm({ t: '', c: '' });
          return;
        }
      }
    }

    if (isMobile) {
      const appUrl = getMobileXAppUrl(SHARE_TEXT, SHARE_URL);
      const fallbackUrl = shareUrl.toString();
      window.location.href = appUrl;
      setTimeout(() => {
        window.location.href = fallbackUrl;
      }, 1200);
      setAm({ t: 'Opening X…', c: 'ok' });
      return;
    }

    window.open(shareUrl.toString(), '_blank', 'noopener,noreferrer');
    setAm({ t: 'Opening X to share your Fan ID…', c: 'ok' });
  };

  return (
    <>
      <header>
        <div className="an kicker">AN INDEPENDENT FAN PROJECT</div>
        <h1>BAD OMENS</h1>
        <div className="an tag">FAN ID</div>
        <p>Your music. Your story. Your place in the fandom. Create your own Bad Omens fan card with your X profile and Top 5 picks.</p>
      </header>
      <main>
        <FanIdForm state={s} setState={setS} onReset={() => { setS(EMPTY); setAm({ t: '', c: '' }); }} />
        <section className="stage" aria-label="Preview" ref={exportRef}>
          <div className="export-scene" aria-hidden="true">
            <FanIdPreview exportMode={exportLayout} code={code} handle={s.handle} name={s.name} photo={s.photo} year={s.year} top={s.top} />
          </div>
          <FanIdPreview vertical={previewVertical} code={code} handle={s.handle} name={s.name} photo={s.photo} year={s.year} top={s.top} />
          <div className="format-toggle" role="radiogroup" aria-label="Choose card format">
            <label>
              <input type="radio" name="export-layout" value="horizontal" checked={exportLayout === 'horizontal'} onChange={(e) => setExportLayout(e.target.value)} />
              Horizontal
            </label>
            <label>
              <input type="radio" name="export-layout" value="vertical" checked={exportLayout === 'vertical'} onChange={(e) => setExportLayout(e.target.value)} />
              Vertical
            </label>
          </div>
          <div className="actions">
            <button className="pri" type="button" onClick={dl} disabled={!isReady}>DOWNLOAD</button>
            <button className="pri" type="button" onClick={share} disabled={!isReady}>SHARE</button>
          </div>
          <div className={`msg ${am.c}`} role="status">{am.t}</div>
        </section>
      </main>
      <footer>
        <p>
          Fan project by Nayara Ferreira · <a href="https://x.com/pearlygates404" target="_blank" rel="noopener noreferrer">@pearlygates404</a><br />
          Not affiliated with or endorsed by Bad Omens or its representatives.
          Not an official credential.<br />
          <a href="https://unavatar.io">Avatars provided by Unavatar</a>
        </p>
      </footer>
    </>
  );
}
