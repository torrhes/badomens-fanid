import { useEffect, useId, useRef, useState } from 'react';

// Select customizado. A lista abre com 100% da largura do campo.
// options: [{ value, label }]
export default function SelectField({ id, value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrap = useRef(null);
  const listId = useId();
  const selected = Math.max(0, options.findIndex((o) => o.value === value));

  useEffect(() => {
    const close = (e) => { if (!wrap.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, []);

  useEffect(() => {
    if (open) document.getElementById(`${listId}-${active}`)?.scrollIntoView({ block: 'nearest' });
  }, [open, active, listId]);

  const openList = () => { setActive(selected); setOpen(true); };
  const pick = (i) => { onChange(options[i].value); setOpen(false); };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) return openList();
      setActive((i) => Math.max(0, Math.min(options.length - 1, i + (e.key === 'ArrowDown' ? 1 : -1))));
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (open) pick(active); else openList();
    } else if (e.key === 'Escape' || e.key === 'Tab') {
      setOpen(false);
    }
  };

  return (
    <div className="cb" ref={wrap}>
      <button
        id={id} type="button" className="selbtn"
        aria-haspopup="listbox" aria-expanded={open} aria-controls={listId}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
      >
        <span>{options[selected]?.label}</span>
        <span className="caret" aria-hidden="true">▾</span>
      </button>
      {open && (
        <div className="dd" id={listId} role="listbox">
          {options.map((o, i) => (
            <div
              key={o.value} id={`${listId}-${i}`} role="option" aria-selected={i === selected}
              className={`opt${i === active ? ' act' : ''}${i === selected ? ' on' : ''}`}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => pick(i)}
            >{o.label}</div>
          ))}
        </div>
      )}
    </div>
  );
}
