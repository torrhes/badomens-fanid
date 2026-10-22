import { useState } from 'react';
import { getBadge } from '../data/badges.js';

export default function FanIdCard({ handle, name, photo, year, top, vertical }) {
  const h = handle || 'yourhandle';
  const [code] = useState(() => String(Math.floor(Math.random() * 1e6)).padStart(6, '0'));
  const badge = getBadge(year);
  const showName = name && name.toLowerCase() !== h.toLowerCase();

  const ring = <img className="ring" src="/crown.png" alt="" />;
  const topBar = <div className="top" />;
  const frame = (
    <div className="frame">
      {photo ? (
        <><img className="p" src={photo} alt="" /><div className="dots" /></>
      ) : (
        <><img className="p placeholder" src="/specter.jpg" alt="Specter placeholder" /><div className="dots" /></>
      )}
    </div>
  );
  const cap = <div className="sm ph-cap">[ {photo ? 'X PROFILE PHOTO' : 'NO PHOTO'} ]</div>;
  const bar = <div className="bar" />;
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
      <div id="card">
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
    <div id="card">
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
