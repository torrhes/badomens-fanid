import FanIdCard from './FanIdCard.jsx';
export default function FanIdPreview({ vertical, ...props }) {
  return (
    <div className={`wrap${vertical ? ' v' : ''}`}>
      <div
        id="scene"
        className={vertical ? 'v' : undefined}
        data-layout={vertical ? 'vertical' : 'landscape'}
      >
        <img src="/crown.png" alt="" className="bgc" />
        <div className="strap">BAD OMENS</div>
        <div className="clip" />
        <div className="holder"><FanIdCard {...props} vertical={vertical} /></div>
      </div>
    </div>
  );
}
