import { useId, useState } from 'react';
import { getBadge } from '../data/badges.js';

export default function FanIdCard({ handle, name, photo, year, top, vertical, code: codeProp }) {
  const h = handle || 'yourhandle';
  const [ownCode] = useState(() => String(Math.floor(Math.random() * 1e6)).padStart(6, '0'));
  const code = codeProp || ownCode;
  const pid = 'bc' + useId().replace(/[^a-zA-Z0-9]/g, '');
  const badge = getBadge(year);
  const showName = name && name.toLowerCase() !== h.toLowerCase();
const dots = (
  <svg className="dots" width="100%" height="100%" aria-hidden="true">
    {Array.from({ length: 100 }, (_, k) => (
      <circle
        key={k} cx="0" cy="0" r={4 * k + 0.5}
        fill="none" stroke="#000" strokeOpacity="0.4" strokeWidth="1"
      />
    ))}
  </svg>
);
  const ring = <img className="ring" src="/crown.png" alt="" />;
  const topBar = <div className="top" />;
const frame = (
  <div className="frame">
    {photo ? (
      <><img className="p" src={photo} alt="" />{dots}</>
    ) : (
      <><img className="p placeholder" src="/specter.jpg" alt="Specter placeholder" />{dots}</>
    )}
  </div>
);
  const cap = <div className="sm ph-cap">[ {photo ? 'X PROFILE PHOTO' : 'NO PHOTO'} ]</div>;
  const bar = (
    <div className="bar">
      <svg width="100%" height="100%" aria-hidden="true">
        <defs>
          <pattern id={pid} patternUnits="userSpaceOnUse" width="9" height="40">
            <rect x="0" width="2" height="40" fill="#e8e3d8" />
            <rect x="4" width="1" height="40" fill="#e8e3d8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${pid})`} />
      </svg>
    </div>
  );
  const fanNo = <div className="sm fan-no">FAN ID Nº {code}</div>;
  const badgeEl = (
    <div className="badge">
      <span>LV {String(badge.level).padStart(2, '0')}</span>
      <b>{badge.name}</b>
    </div>
  );
  const hd = <div className="hd"><div className="an big">BAD OMENS</div><div className="an pill">FAN ID</div></div>;
  const series = <div className="sm">SERIES - DOPM / 26</div>;
  const handleEl = <div className={`an handle${h.length > 12 ? ' long' : ''}`}>@{h}</div>;
  const since = (
    <div className="since">
      {year ? `A FAN SINCE ${year}` : 'A FAN'}{showName ? ` · ${name.slice(0, 22).toUpperCase()}` : ''}
    </div>
  );
  const archive = <div className="sm archive">TOP 5 / ARCHIVE</div>;
  const songs = (
    <div className="songs">
      {[0, 1, 2, 3, 4].map((i) => (
        <div className="song" key={i}><b>0{i + 1}</b><span>{top[i] || '—'}</span></div>
      ))}
    </div>
  );
  const foot = <div className="foot"><span>An fan project by @pearlygates404</span><span>Not affiliated with Bad Omens</span></div>;

  // Versão vertical (celular): tudo empilhado em uma coluna só.
  if (vertical) {
    return (
      <div className="card">
        {ring}{topBar}
        {hd}{series}
        <div className="vphoto">{frame}{cap}</div>
        {handleEl}{since}{badgeEl}
        {archive}{songs}
        {fanNo}{bar}
        {foot}
      </div>
    );
  }

  // Versão horizontal (desktop/tablet): igual à original.
  return (
    <div className="card">
      {ring}{topBar}
      <div className="ph">
        {frame}{cap}{bar}{fanNo}{badgeEl}
      </div>
      <div className="info">
        {hd}{series}{handleEl}{since}{archive}{songs}
      </div>
      {foot}
    </div>
  );
}
