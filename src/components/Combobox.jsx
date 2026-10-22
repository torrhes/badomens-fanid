import { useEffect, useId, useMemo, useRef, useState } from 'react';

// Campo com sugestões. A lista abre logo abaixo do input, com 100% da largura dele.
export default function Combobox({ id, value, onChange, onPick, onEnter, options, placeholder }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const wrap = useRef(null);
  const listId = useId();
  const q = value.trim().toLowerCase();
  const items = useMemo(
    () => options.filter((o) => !q || o.toLowerCase().includes(q)),
    [options, q],
  );

  useEffect(() => {
    const close = (e) => { if (!wrap.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, []);

  useEffect(() => {
    if (active >= 0) document.getElementById(`${listId}-${active}`)?.scrollIntoView({ block: 'nearest' });
  }, [active, listId]);

  const pick = (o) => { onPick(o); setOpen(false); setActive(-1); };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault(); setOpen(true);
      setActive((i) => Math.min(i + 1, items.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (open && active >= 0 && items[active]) pick(items[active]);
      else onEnter?.();
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const show = open && items.length > 0;
  return (
    <div className="cb" ref={wrap}>
      <input
        id={id} value={value} autoComplete="off" placeholder={placeholder}
        role="combobox" aria-expanded={show} aria-controls={listId} aria-autocomplete="list"
        aria-activedescendant={show && active >= 0 ? `${listId}-${active}` : undefined}
        onChange={(e) => { onChange(e.target.value); setOpen(true); setActive(-1); }}
        onFocus={() => setOpen(true)}
        onClick={() => setOpen(true)}
        onKeyDown={onKeyDown}
      />
      {show && (
        <div className="dd" id={listId} role="listbox">
          {items.map((o, i) => (
            <div
              key={o} id={`${listId}-${i}`} role="option" aria-selected={i === active}
              className={`opt${i === active ? ' act' : ''}`}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => pick(o)}
            >{o}</div>
          ))}
        </div>
      )}
    </div>
  );
}
