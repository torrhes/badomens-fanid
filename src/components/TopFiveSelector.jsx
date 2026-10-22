import { useState } from 'react';
import { SONGS } from '../data/songs.js';
import Combobox from './Combobox.jsx';
export default function TopFiveSelector({ top, setTop }) {
  const [q, setQ] = useState('');
  const [err, setErr] = useState('');
  const availableSongs = SONGS.filter((song) => !top.some((selected) => selected.toLowerCase() === song.toLowerCase()));

  const add = (valueOverride) => {
    const v = (valueOverride ?? q).trim();
    setErr('');
    if (!v) return;

    setTop((prev) => {
      if (prev.length >= 5) {
        setErr('You already have 5 songs.');
        return prev;
      }
      if (prev.some((t) => t.toLowerCase() === v.toLowerCase())) {
        setErr('That song is already in your list.');
        return prev;
      }

      const nextSong = SONGS.find((s) => s.toLowerCase() === v.toLowerCase()) || v.slice(0, 60);
      return [...prev, nextSong];
    });

    setQ('');
  };

  const move = (i, d) => {
    const j = i + d;
    if (j < 0 || j >= top.length) return;

    setTop((prev) => {
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  };

  const remove = (i) => {
    setTop((prev) => prev.filter((_, index) => index !== i));
  };

  return (
    <fieldset>
      <legend>02 / TOP 5</legend>
      <label htmlFor="s">SEARCH A SONG</label>
      <div className="row">
        <Combobox
          id="s" value={q} options={availableSongs} placeholder="Type a title"
          onPick={(v) => add(v)} onEnter={() => add()}
          onChange={(next) => {
            setQ(next);
            const val = next.trim();
            if (val && SONGS.some((s) => s.toLowerCase() === val.toLowerCase())) add(val);
          }}
        />
        <button type="button" onClick={() => add()}>ADD</button>
      </div>
      <div className="msg err" role="alert">{err}</div>
      <ol aria-label="Your Top 5">
        {top.map((t, i) => (
          <li key={t}><span className="n">#{i + 1}</span><span className="t">{t}</span>
            <button type="button" aria-label={`Move up ${t}`} onClick={() => move(i, -1)}>↑</button>
            <button type="button" aria-label={`Move down ${t}`} onClick={() => move(i, 1)}>↓</button>
            <button type="button" aria-label={`Remove ${t}`} onClick={() => remove(i)}>✕</button></li>
        ))}
      </ol>
    </fieldset>
  );
}
