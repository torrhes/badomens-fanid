import FanIdCard from './FanIdCard.jsx';
import { getExportDimensions } from '../lib/exportPng.js';

export default function FanIdPreview({ vertical, exportMode, ...props }) {
  const layout = exportMode === 'vertical' ? 'vertical' : 'horizontal';
  const isExport = Boolean(exportMode);
  const v = vertical && !isExport;
  const dims = getExportDimensions(layout);

  return (
    <div
      className={`wrap${v ? ' v' : ''}${isExport ? ' export' : ''}`}
      style={isExport ? { width: dims.width, maxWidth: 'none' } : undefined}
    >
      <div
        className={`scene${v ? ' v' : ''}${isExport ? ' export' : ''}`}
        data-layout={isExport ? layout : v ? 'vertical' : 'landscape'}
        style={
          isExport
            ? {
                '--c': '1px',
                width: dims.width,
                height: dims.height,
                aspectRatio: 'auto',
              }
            : undefined
        }
      >
        <div className="strap">BAD OMENS</div>
        <div className="clip" />
        <div className="holder"><FanIdCard {...props} vertical={isExport ? layout === 'vertical' : v} /></div>
      </div>
    </div>
  );
}
