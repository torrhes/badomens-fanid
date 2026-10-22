import FanIdCard from './FanIdCard.jsx';

// exportMode: cópia fixa 960x760 (sempre horizontal), usada só para gerar o PNG.
export default function FanIdPreview({ vertical, exportMode, ...props }) {
  const v = vertical && !exportMode;
  return (
    <div
      className={`wrap${v ? ' v' : ''}`}
      style={exportMode ? { width: 960, maxWidth: 'none' } : undefined}
    >
      <div
        className={`scene${v ? ' v' : ''}`}
        data-layout={v ? 'vertical' : 'landscape'}
        style={exportMode ? { '--c': '1px', width: 960, height: 760, aspectRatio: 'auto' } : undefined}
      >

        <div className="strap">BAD OMENS</div>
        <div className="clip" />
        <div className="holder"><FanIdCard {...props} vertical={v} /></div>
      </div>
    </div>
  );
}
